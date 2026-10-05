"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, Clock } from "lucide-react";
import { toast } from "sonner";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/actions/blog.actions";

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    readingTime: 5,
    published: true,
    featured: false,
  });

  const loadBlogs = async () => {
    setIsLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      readingTime: 5,
      published: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog: any) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      readingTime: blog.readingTime,
      published: blog.published,
      featured: blog.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: formData.excerpt,
      content: formData.content,
      readingTime: Number(formData.readingTime) || 5,
      published: formData.published,
      featured: formData.featured,
    };

    if (editingId) {
      const res = await updateBlog(editingId, payload);
      if (res.success) {
        toast.success("Blog post updated!");
        setIsModalOpen(false);
        loadBlogs();
      } else {
        toast.error(res.error || "Failed to update blog");
      }
    } else {
      const res = await createBlog(payload as any);
      if (res.success) {
        toast.success("Blog post created!");
        setIsModalOpen(false);
        loadBlogs();
      } else {
        toast.error(res.error || "Failed to create blog");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const res = await deleteBlog(id);
    if (res.success) {
      toast.success("Blog post deleted");
      loadBlogs();
    } else {
      toast.error(res.error || "Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Blog Posts</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage live articles directly from PostgreSQL
          </p>
        </div>
        <Link
          href="/dashboard/blogs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-xs">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs">Title</th>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs hidden sm:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs hidden md:table-cell">Reading Time</th>
                <th className="text-right px-5 py-3 text-slate-500 font-semibold text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{blog.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">/{blog.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${blog.published ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                      {blog.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-medium">
                      <Clock size={12} /> {blog.readingTime} min
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEditModal(blog)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-text-tertiary">
                    No blog posts found. Click &quot;New Article&quot; to write one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl glass p-6 border border-border-subtle bg-surface-50">
            <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-3">
              <h3 className="text-lg font-bold text-text-primary">{editingId ? "Edit Article" : "New Article"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-tertiary hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Slug</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Excerpt</label>
                <textarea rows={2} required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Content (Markdown / MDX)</label>
                <textarea rows={5} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
                    <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="rounded border-border-subtle bg-surface-100 text-brand-500" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
                    <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded border-border-subtle bg-surface-100 text-brand-500" />
                    Featured
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-text-secondary">Read Time (min):</label>
                  <input type="number" min={1} max={60} value={formData.readingTime} onChange={(e) => setFormData({ ...formData, readingTime: Number(e.target.value) })} className="w-16 px-2 py-1 rounded-lg bg-surface-100 border border-border-subtle text-text-primary text-xs" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl glass text-xs font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-xs font-semibold text-white hover:shadow-glow-md disabled:opacity-50">
                  {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Create Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
