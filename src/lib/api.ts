import axios from "axios";

/**
 * Axios instance pre-configured for the existing Express backend.
 *
 * Set VITE_API_URL in a .env file to point at your backend, e.g.
 *   VITE_API_URL=http://localhost:5000
 * If not set, requests go to the same origin (useful with a Vite proxy).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

// Attach the JWT from localStorage on every request.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ---------------- Types ---------------- */

export interface Author {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  category?: string;
  coverImage?: string;
  theme?: string;
  author?: Author | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  createdAt?: string;
}

/* ---------------- Auth API ---------------- */

export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await api.post("/api/users/register", data);
  return res.data;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await api.post("/api/users/login", data);
  return res.data;
}

/* ---------------- Blog API ---------------- */

export async function getBlogs(): Promise<Blog[]> {
  const res = await api.get("/api/blogs");
  // Support both `[...]` and `{ blogs: [...] }` response shapes.
  return Array.isArray(res.data) ? res.data : (res.data?.blogs ?? []);
}

export async function getBlog(id: string): Promise<Blog> {
  const res = await api.get(`/api/blogs/${id}`);
  return res.data?.blog ?? res.data;
}

export async function createBlog(data: Partial<Blog>) {
  const res = await api.post("/api/blogs", data);
  return res.data;
}

export async function updateBlog(id: string, data: Partial<Blog>) {
  const res = await api.put(`/api/blogs/${id}`, data);
  return res.data;
}

export async function deleteBlog(id: string) {
  const res = await api.delete(`/api/blogs/${id}`);
  return res.data;
}