import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createBlog } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { BlogEditor, type BlogDraft } from "@/components/BlogEditor";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Blog — Luminae" },
      { name: "description", content: "Write a new blog in a calm, distraction-free Markdown editor." },
    ],
  }),
  component: CreateBlogPage,
});

function CreateBlogPage() {
  const { isLoggedIn, ready } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [savedDraft, setSavedDraft] = useState(false);

  useEffect(() => {
    if (ready && !isLoggedIn) navigate({ to: "/login" });
  }, [ready, isLoggedIn, navigate]);

  const publishMutation = useMutation({
    mutationFn: (draft: BlogDraft) => createBlog(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      localStorage.removeItem("blog-draft");
      navigate({ to: "/dashboard" });
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Failed to publish. Is the backend running?");
    },
  });

  const handleSaveDraft = (draft: BlogDraft) => {
    localStorage.setItem("blog-draft", JSON.stringify(draft));
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  // Restore a locally saved draft, if any.
  const [initial] = useState(() => {
    if (typeof window === "undefined") return undefined;
    try {
      const raw = localStorage.getItem("blog-draft");
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  });

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mx-auto mb-8 max-w-7xl px-4 sm:px-6"
      >
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          A blank page, <span className="text-gradient">full of possibility</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Write in Markdown on the left — watch it come alive on the right.
        </p>
        {savedDraft && (
          <p className="mt-3 text-sm font-medium text-primary animate-fade-in">
            Draft saved locally ✓
          </p>
        )}
      </motion.div>

      <BlogEditor
        initial={initial}
        submitting={publishMutation.isPending}
        error={error}
        onPublish={(draft) => publishMutation.mutate(draft)}
        onSaveDraft={handleSaveDraft}
      />
    </PageShell>
  );
}