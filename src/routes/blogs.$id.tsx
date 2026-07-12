import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Pencil, Trash2, Check, User } from "lucide-react";
import { getBlog, deleteBlog } from "@/lib/api";
import { authorId, authorName, formatDate, getTheme, readingTime } from "@/lib/blog-utils";
import { MarkdownPreview } from "@/components/MarkdownPreview";
import { PageShell, Spinner } from "@/components/PageShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/blogs/$id")({
  head: () => ({
    meta: [
      { title: "Reading — Luminae" },
      { name: "description", content: "A beautiful reading experience on Luminae." },
    ],
  }),
  component: BlogDetails,
});

function BlogDetails() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
    retry: 1,
  });

  const removeMutation = useMutation({
    mutationFn: () => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate({ to: "/blogs" });
    },
  });

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog?.title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <PageShell>
        <Spinner label="Opening story" />
      </PageShell>
    );
  }

  if (isError || !blog) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-6 text-center">
          <h1 className="font-display text-2xl font-semibold">Story not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This blog may have been removed, or the backend isn't reachable.
          </p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl glass px-6 py-3 text-sm font-semibold"
          >
            <ArrowLeft size={16} /> Back to blogs
          </Link>
        </div>
      </PageShell>
    );
  }

  const theme = getTheme(blog.theme);
  const isOwner = user && authorId(blog) === user._id;

  return (
    <PageShell className="pb-0">
      {/* Cover */}
      {blog.coverImage && (
        <div className="relative -mt-24 h-[55vh] w-full overflow-hidden">
          <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero-overlay" />
        </div>
      )}

      <div
        className="pb-20"
        style={{ background: theme.background, color: theme.text, fontFamily: theme.fontFamily }}
      >
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className={`mx-auto max-w-3xl px-4 sm:px-6 ${blog.coverImage ? "-mt-24 relative z-10" : "pt-10"}`}
        >
          <div
            className="rounded-3xl p-7 backdrop-blur-2xl sm:p-12"
            style={{
              background: theme.cardBg,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs" style={{ color: theme.text, opacity: 0.75 }}>
              {blog.category && (
                <span
                  className="rounded-full px-3 py-1 font-semibold"
                  style={{ background: `${theme.accent}22`, color: theme.accent }}
                >
                  {blog.category}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <User size={13} /> {authorName(blog)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> {readingTime(blog.content)}
              </span>
              {blog.createdAt && <span>{formatDate(blog.createdAt)}</span>}
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {blog.title}
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: theme.accent }} />

            <div className="mt-8">
              <MarkdownPreview content={blog.content} />
            </div>

            {/* Actions */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: `${theme.accent}22`, color: theme.accent }}
              >
                {copied ? <Check size={15} /> : <Share2 size={15} />}
                {copied ? "Link copied" : "Share"}
              </button>

              {isOwner && (
                <>
                  <Link
                    to="/edit/$id"
                    params={{ id: blog._id }}
                    className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.1)", color: theme.text }}
                  >
                    <Pencil size={15} /> Edit
                  </Link>
                  <button
                    onClick={() => (confirming ? removeMutation.mutate() : setConfirming(true))}
                    disabled={removeMutation.isPending}
                    className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-destructive transition-transform hover:scale-105 disabled:opacity-50"
                    style={{ background: "rgba(220,60,60,0.12)" }}
                  >
                    <Trash2 size={15} />
                    {removeMutation.isPending
                      ? "Deleting…"
                      : confirming
                        ? "Confirm delete?"
                        : "Delete"}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </PageShell>
  );
}