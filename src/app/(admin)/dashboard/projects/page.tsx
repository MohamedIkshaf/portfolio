"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getProjects, createProject, updateProject, deleteProject } from "@/actions/project.actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { MDXEditor } from "@/components/admin/mdx-editor";
import { FormField } from "@/components/admin/form-field";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    coverImage: "",
    techStackStr: "",
    githubUrl: "",
    liveUrl: "",
    architecture: "",
    challenges: "",
    lessons: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED",
    featured: false,
  });

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      coverImage: "",
      techStackStr: "Next.js, TypeScript, Tailwind CSS, PostgreSQL",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      architecture: "",
      challenges: "",
      lessons: "",
      status: "PUBLISHED",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || "",
      slug: proj.slug || "",
      description: proj.description || "",
      content: proj.content || "",
      coverImage: proj.coverImage || "",
      techStackStr: proj.techStack?.join(", ") || "",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      architecture: proj.architecture || "",
      challenges: proj.challenges || "",
      lessons: proj.lessons || "",
      status: proj.status || "PUBLISHED",
      featured: proj.featured || false,
    });
    setIsModalOpen(true);
  };

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

    if (editingId) {
      const res = await updateProject(editingId, payload);
      if (res.success) {
        toast.success("Project updated successfully!");
        setIsModalOpen(false);
        loadProjects();
      } else {
        toast.error(res.error || "Failed to update project");
      }
    } else {
      const res = await createProject(payload as any);
      if (res.success) {
        toast.success("Project created successfully!");
        setIsModalOpen(false);
        loadProjects();
      } else {
        toast.error(res.error || "Failed to create project");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const res = await deleteProject(id);
    if (res.success) {
      toast.success("Project deleted");
      loadProjects();
    } else {
      toast.error(res.error || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Projects</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage live portfolio projects directly from PostgreSQL
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-all shadow-xs"
            title="Open project modal"
          >
            <Plus size={16} />
            Quick Add
          </button>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
          >
            <Plus size={16} />
            Add Project
          </Link>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        /* Table */
        <div className="rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-xs">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs">Title</th>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs hidden sm:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs hidden md:table-cell">Featured</th>
                <th className="text-left px-5 py-3 text-slate-500 font-semibold text-xs hidden lg:table-cell">Tech Stack</th>
                <th className="text-right px-5 py-3 text-slate-500 font-semibold text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{project.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">/{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        project.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {project.status === "PUBLISHED" ? <Eye size={12} /> : <EyeOff size={12} />}
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {project.featured ? (
                      <span className="text-indigo-600 font-semibold text-xs">⭐ Featured</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-slate-500 text-xs max-w-xs truncate">
                    {project.techStack?.join(", ")}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                        title="Edit Project"
                      >
                        <Pencil size={14} />
                      </button>
                      <Link
                        href={`/dashboard/projects/${project.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        title="Open Full Page Editor"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    No projects found. Click &quot;Add Project&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog with Full Details like Create Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 md:p-8 border border-slate-200 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId
                    ? "Update complete project details, cover image, and case study"
                    : "Fill out full project details"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {editingId && (
                  <Link
                    href={`/dashboard/projects/${editingId}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    title="Open full page editor"
                  >
                    <ExternalLink size={14} />
                    <span className="hidden sm:inline">Full Page View</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Project Title" required>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="E-Commerce Platform"
                  />
                </FormField>

                <FormField label="Slug (URL identifier)">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="ecommerce-platform"
                  />
                </FormField>
              </div>

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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                  placeholder="A brief summary of what this project does..."
                />
              </FormField>

              <FormField label="Tech Stack (comma separated)">
                <input
                  type="text"
                  value={formData.techStackStr}
                  onChange={(e) => setFormData({ ...formData, techStackStr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Next.js, TypeScript, PostgreSQL, Prisma, Stripe"
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="GitHub Repository URL">
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="https://github.com/username/repo"
                  />
                </FormField>
                <FormField label="Live Demo URL">
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="https://myproject.com"
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
                    id="modal-featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="modal-featured" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
