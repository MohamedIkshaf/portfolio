"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createBlog } from "@/actions/blog.actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { MDXEditor } from "@/components/admin/mdx-editor";
import { FormField } from "@/components/admin/form-field";

export default function NewBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    readingTime: 5,
    published: true,
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage,
      readingTime: Number(formData.readingTime) || 5,
      published: formData.published,
      featured: formData.featured,
    };

    const res = await createBlog(payload as any);
    if (res.success) {
      toast.success("Blog article published!");
      router.push("/dashboard/blogs");
    } else {
      toast.error(res.error || "Failed to create blog");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/blogs"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Write New Article</h2>
            <p className="text-sm text-slate-500">Publish or draft a new blog post</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-5">
          <FormField label="Article Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Building a Modern Portfolio with Next.js 16"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </FormField>

          <FormField label="Slug (URL identifier)">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="building-modern-portfolio-nextjs-16"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </FormField>

          <FormField label="Cover Image">
            <ImageUploader
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
            />
          </FormField>

          <FormField label="Excerpt / Summary" required>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A brief summary of the article..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            />
          </FormField>

          <FormField label="Article Content (Markdown / MDX)" required>
            <MDXEditor
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
            />
          </FormField>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Published
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Featured Article
              </label>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Estimated Read Time:</span>
              <input
                type="number"
                min={1}
                max={60}
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: Number(e.target.value) })}
                className="w-16 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium text-center"
              />
              <span className="text-xs text-slate-500">min</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/blogs"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={14} /> Publish Article
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
