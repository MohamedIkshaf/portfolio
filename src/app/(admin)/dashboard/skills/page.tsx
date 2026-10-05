"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/actions/skill.actions";

const categoryColors: Record<string, string> = {
  FRONTEND: "bg-brand-500/10 text-brand-400",
  BACKEND: "bg-accent-500/10 text-accent-400",
  DATABASE: "bg-success/10 text-success",
  DEVOPS: "bg-warning/10 text-warning",
  TOOLS: "bg-info/10 text-info",
};

export default function DashboardSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    icon: "code",
    proficiency: 80,
    category: "FRONTEND" as "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "TOOLS",
    order: 1,
  });

  const loadSkills = async () => {
    setIsLoading(true);
    const data = await getSkills();
    setSkills(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      icon: "code",
      proficiency: 80,
      category: "FRONTEND",
      order: skills.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: any) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      icon: skill.icon || "code",
      proficiency: skill.proficiency,
      category: skill.category,
      order: skill.order || 1,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingId) {
      const res = await updateSkill(editingId, formData);
      if (res.success) {
        toast.success("Skill updated!");
        setIsModalOpen(false);
        loadSkills();
      } else {
        toast.error(res.error || "Failed to update skill");
      }
    } else {
      const res = await createSkill(formData);
      if (res.success) {
        toast.success("Skill created!");
        setIsModalOpen(false);
        loadSkills();
      } else {
        toast.error(res.error || "Failed to create skill");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    const res = await deleteSkill(id);
    if (res.success) {
      toast.success("Skill deleted");
      loadSkills();
    } else {
      toast.error(res.error || "Failed to delete skill");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Skills</h2>
          <p className="text-sm text-slate-500 mt-1">Manage technical skills in PostgreSQL database</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="rounded-2xl bg-white p-5 group border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-slate-900">{skill.name}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mt-1 ${categoryColors[skill.category] || "bg-slate-100 text-slate-600"}`}>
                    {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(skill)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(skill.id, skill.name)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-600" style={{ width: `${skill.proficiency}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-500">{skill.proficiency}%</span>
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-text-tertiary col-span-full text-center py-8">
              No skills added yet.
            </p>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass p-6 border border-border-subtle bg-surface-50">
            <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-3">
              <h3 className="text-lg font-bold text-text-primary">{editingId ? "Edit Skill" : "Add Skill"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-tertiary hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Skill Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" placeholder="React" />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-border-subtle text-text-primary text-sm focus:outline-none">
                  <option value="FRONTEND">Frontend</option>
                  <option value="BACKEND">Backend</option>
                  <option value="DATABASE">Database</option>
                  <option value="DEVOPS">DevOps</option>
                  <option value="TOOLS">Tools</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-text-secondary">Proficiency</label>
                  <span className="text-xs text-brand-400 font-bold">{formData.proficiency}%</span>
                </div>
                <input type="range" min={10} max={100} value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })} className="w-full accent-brand-500 cursor-pointer" />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl glass text-xs font-medium text-text-secondary hover:text-text-primary">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-xs font-semibold text-white hover:shadow-glow-md disabled:opacity-50">
                  {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Create Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
