"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Calendar, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/actions/experience.actions";

export default function DashboardExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "2024-01-01",
    endDate: "",
    description: "",
    current: true,
  });

  const loadExperiences = async () => {
    setIsLoading(true);
    const data = await getExperiences();
    setExperiences(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      company: "",
      location: "Remote",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      description: "",
      current: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: any) => {
    setEditingId(exp.id);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || "",
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "",
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
      description: exp.description || "",
      current: exp.current,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingId) {
      const res = await updateExperience(editingId, formData as any);
      if (res.success) {
        toast.success("Experience updated!");
        setIsModalOpen(false);
        loadExperiences();
      } else {
        toast.error(res.error || "Failed to update experience");
      }
    } else {
      const res = await createExperience(formData as any);
      if (res.success) {
        toast.success("Experience created!");
        setIsModalOpen(false);
        loadExperiences();
      } else {
        toast.error(res.error || "Failed to create experience");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete experience "${title}"?`)) return;
    const res = await deleteExperience(id);
    if (res.success) {
      toast.success("Experience deleted");
      loadExperiences();
    } else {
      toast.error(res.error || "Failed to delete experience");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Experience</h2>
          <p className="text-sm text-slate-500 mt-1">Manage work history in PostgreSQL database</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="rounded-2xl bg-white p-6 group border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{exp.title}</h4>
                  <p className="text-sm text-indigo-600 font-semibold mt-0.5">{exp.company}</p>
                  {exp.location && <p className="text-xs text-slate-400 mt-1">{exp.location}</p>}
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
                    <Calendar size={13} className="text-slate-400" />
                    {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {" — "}
                    {exp.current ? (
                      <span className="text-emerald-600 font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">Present</span>
                    ) : (
                      exp.endDate && new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    )}
                  </div>
                  {exp.description && <p className="text-sm text-slate-600 mt-3 leading-relaxed">{exp.description}</p>}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(exp)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(exp.id, exp.title)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">No experience history found.</p>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{editingId ? "Edit Experience" : "Add Experience"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="Associate Software Engineer" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="Tech Company Inc" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs" />
                </div>
                {!formData.current && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                    <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="current" checked={formData.current} onChange={(e) => setFormData({ ...formData, current: e.target.checked })} className="rounded border-slate-300 text-indigo-600" />
                <label htmlFor="current" className="text-xs font-semibold text-slate-700 cursor-pointer">I currently work here</label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Responsibilities and accomplishments..." />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs disabled:opacity-50">{isSubmitting ? "Saving..." : "Save Experience"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
