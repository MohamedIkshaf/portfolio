"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createProject } from "@/actions/project.actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { MDXEditor } from "@/components/admin/mdx-editor";
import { FormField } from "@/components/admin/form-field";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    coverImage: "",
    techStackStr: "Next.js, TypeScript, Tailwind CSS, PostgreSQL",
    githubUrl: "",
    liveUrl: "",
    architecture: "",
    challenges: "",
    lessons: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED",
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: formData.description,
      content: formData.content,
      coverImage: formData.coverImage,
      techStack: formData.techStackStr.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      architecture: formData.architecture,
      challenges: formData.challenges,
      lessons: formData.lessons,
      status: formData.status,
      featured: formData.featured,
    };

    const res = await createProject(payload as any);
    if (res.success) {
      toast.success("Project created successfully!");
      router.push("/dashboard/projects");
    } else {
      toast.error(res.error || "Failed to create project");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Project</h2>
            <p className="text-sm text-slate-500">Add a new project to your portfolio</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-5">
          <FormField label="Project Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E-Commerce Platform"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </FormField>

          <FormField label="Slug (URL identifier)">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="ecommerce-platform"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </FormField>

          <FormField label="Cover Image">
            <ImageUploader
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
            />
          </FormField>

          <FormField label="Short Description" required>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A brief summary of what this project does..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            />
          </FormField>

          <FormField label="Tech Stack (comma separated)">
            <input
              type="text"
              value={formData.techStackStr}
              onChange={(e) => setFormData({ ...formData, techStackStr: e.target.value })}
              placeholder="Next.js, TypeScript, PostgreSQL, Prisma, Stripe"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </FormField>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="GitHub Repository URL">
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </FormField>
            <FormField label="Live Demo URL">
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://myproject.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </FormField>
          </div>

          <FormField label="Full Content / Case Study (Markdown / MDX)">
            <MDXEditor
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
            />
          </FormField>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <FormField label="Architecture Details">
              <textarea
                rows={3}
                value={formData.architecture}
                onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                placeholder="System architecture summary..."
              />
            </FormField>
            <FormField label="Technical Challenges">
              <textarea
                rows={3}
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                placeholder="Key challenges faced..."
              />
            </FormField>
            <FormField label="Lessons Learned">
              <textarea
                rows={3}
                value={formData.lessons}
                onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                placeholder="Lessons learned from building..."
              />
            </FormField>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Feature on Homepage
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/projects"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
