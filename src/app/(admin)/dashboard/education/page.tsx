"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Calendar, GraduationCap, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { getEducation, createEducation, updateEducation, deleteEducation } from "@/actions/education.actions";

export default function DashboardEducationPage() {
  const [educationList, setEducationList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "2020-09-01",
    endDate: "2024-06-01",
    description: "",
  });

  const loadEducation = async () => {
    setIsLoading(true);
    const data = await getEducation();
    setEducationList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      degree: "",
      institution: "",
      location: "",
      startDate: "2020-09-01",
      endDate: "2024-06-01",
      description: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu: any) => {
    setEditingId(edu.id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location || "",
      startDate: edu.startDate ? new Date(edu.startDate).toISOString().split("T")[0] : "",
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().split("T")[0] : "",
      description: edu.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingId) {
      const res = await updateEducation(editingId, formData as any);
      if (res.success) {
        toast.success("Education entry updated!");
        setIsModalOpen(false);
        loadEducation();
      } else {
        toast.error(res.error || "Failed to update education");
      }
    } else {
      const res = await createEducation(formData as any);
      if (res.success) {
        toast.success("Education entry created!");
        setIsModalOpen(false);
        loadEducation();
      } else {
        toast.error(res.error || "Failed to create education");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, degree: string) => {
    if (!confirm(`Delete "${degree}"?`)) return;
    const res = await deleteEducation(id);
    if (res.success) {
      toast.success("Education entry deleted");
      loadEducation();
    } else {
      toast.error(res.error || "Failed to delete education");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Education</h2>
          <p className="text-sm text-slate-500 mt-1">Manage education history in PostgreSQL database</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div key={edu.id} className="rounded-2xl bg-white p-6 group border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 h-fit">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{edu.degree}</h4>
                    <p className="text-sm text-indigo-600 font-semibold mt-0.5">{edu.institution}</p>
                    {edu.location && <p className="text-xs text-slate-400 mt-1">{edu.location}</p>}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
                      <Calendar size={13} className="text-slate-400" />
                      {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      {" — "}
                      {edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(edu)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(edu.id, edu.degree)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {educationList.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">No education records found.</p>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{editingId ? "Edit Education" : "Add Education"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Qualification</label>
                <input type="text" required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="Bachelor of Science in Computer Science" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
                <input type="text" required value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="University Name" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Notes</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Relevant coursework, honors, GPA..." />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs disabled:opacity-50">{isSubmitting ? "Saving..." : "Save Education"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
