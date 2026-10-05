"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Share2 } from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateSettings } from "@/actions/settings.actions";
import { ContactSocialForm } from "@/components/forms/contact-social-form";

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "contact">("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    resumeUrl: "",
    analyticsId: "",
  });

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const settings = await getSettings();
      if (settings) {
        setFormData({
          siteName: settings.siteName || "",
          siteDescription: settings.siteDescription || "",
          heroTitle: settings.heroTitle || "",
          heroSubtitle: settings.heroSubtitle || "",
          aboutText: settings.aboutText || "",
          resumeUrl: settings.resumeUrl || "",
          analyticsId: settings.analyticsId || "",
        });
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateSettings(formData);
    if (res.success) {
      toast.success("Site settings updated successfully!");
    } else {
      toast.error(res.error || "Failed to update settings");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure site content, contact channels, and social media handles stored in PostgreSQL
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "general"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Globe size={15} />
          <span>General Site Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "contact"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Share2 size={15} />
          <span>Contact & Social Profiles</span>
        </button>
      </div>

      {activeTab === "contact" ? (
        <ContactSocialForm />
      ) : (
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Site Information</h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Site Name
          </label>
          <input
            type="text"
            value={formData.siteName}
            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Site Description
          </label>
          <textarea
            rows={3}
            value={formData.siteDescription}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Hero Title
          </label>
          <input
            type="text"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            About Section Bio
          </label>
          <textarea
            rows={4}
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Resume URL
          </label>
          <input
            type="url"
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            placeholder="https://drive.google.com/..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Google Analytics ID
          </label>
          <input
            type="text"
            value={formData.analyticsId}
            onChange={(e) => setFormData({ ...formData, analyticsId: e.target.value })}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-xs font-semibold text-white shadow-xs transition-all disabled:opacity-50"
      >
        {isSaving ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save size={16} />
            Save Settings
          </>
        )}
      </button>
    </form>
      )}
    </div>
  );
}
