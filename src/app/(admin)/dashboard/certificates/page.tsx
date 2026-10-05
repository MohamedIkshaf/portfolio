"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Award, ExternalLink, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { getCertificates, createCertificate, deleteCertificate } from "@/actions/certificate.actions";

export default function DashboardCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "2024-06-01",
    credentialUrl: "",
  });

  const loadCertificates = async () => {
    setIsLoading(true);
    const data = await getCertificates();
    setCertificates(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const openCreateModal = () => {
    setFormData({
      title: "",
      issuer: "",
      issueDate: new Date().toISOString().split("T")[0],
      credentialUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createCertificate(formData);
    if (res.success) {
      toast.success("Certificate added!");
      setIsModalOpen(false);
      loadCertificates();
    } else {
      toast.error(res.error || "Failed to add certificate");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete certificate "${title}"?`)) return;
    const res = await deleteCertificate(id);
    if (res.success) {
      toast.success("Certificate deleted");
      loadCertificates();
    } else {
      toast.error(res.error || "Failed to delete certificate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Certificates</h2>
          <p className="text-sm text-slate-500 mt-1">Manage certifications in PostgreSQL database</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-xs"
        >
          <Plus size={16} />
          Add Certificate
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="rounded-2xl bg-white p-6 group border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Award size={20} />
                </div>
                <button onClick={() => handleDelete(cert.id, cert.title)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
              <h4 className="font-bold text-slate-900 text-base">{cert.title}</h4>
              <p className="text-sm text-indigo-600 font-semibold mt-1">{cert.issuer}</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-semibold mt-3 transition-colors">
                  <ExternalLink size={12} /> View Credential
                </a>
              )}
            </div>
          ))}
          {certificates.length === 0 && (
            <p className="text-sm text-slate-400 col-span-full text-center py-8">No certificates found.</p>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Certificate</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Certificate Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="AWS Cloud Practitioner" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Issuing Organization</label>
                <input type="text" required value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="Amazon Web Services" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Date</label>
                <input type="date" required value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Credential Link (URL)</label>
                <input type="url" value={formData.credentialUrl} onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="https://aws.amazon.com/..." />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs disabled:opacity-50">
                  {isSubmitting ? "Adding..." : "Add Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
