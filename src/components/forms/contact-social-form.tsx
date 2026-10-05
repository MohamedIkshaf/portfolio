"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Globe,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Share2,
  CheckCircle2,
  Code2,
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}
import { toast } from "sonner";
import { getSettings, updateSettings } from "@/actions/settings.actions";
import {
  getSocialLinks,
  createSocialLink,
  deleteSocialLink,
} from "@/actions/social.actions";
import { socialPlatforms } from "@/lib/constants";

export function ContactSocialForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [customLinks, setCustomLinks] = useState<any[]>([]);

  // Main settings state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    location: "",
    availability: "",
    responseTime: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    websiteUrl: "",
  });

  // New custom social link modal/inline state
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customPlatform, setCustomPlatform] = useState("LEETCODE");
  const [customUrl, setCustomUrl] = useState("");
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [settings, links] = await Promise.all([
          getSettings(),
          getSocialLinks(),
        ]);

        if (settings) {
          setFormData({
            email: settings.email || "",
            phone: settings.phone || "",
            location: settings.location || "",
            availability: settings.availability || "",
            responseTime: settings.responseTime || "",
            githubUrl: settings.githubUrl || "",
            linkedinUrl: settings.linkedinUrl || "",
            twitterUrl: settings.twitterUrl || "",
            youtubeUrl: settings.youtubeUrl || "",
            websiteUrl: settings.websiteUrl || "",
          });
        }

        if (links) {
          setCustomLinks(links);
        }
      } catch (err) {
        console.error("Failed to load contact/social info:", err);
        toast.error("Could not load contact details");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateSettings(formData);
      if (res.success) {
        toast.success("Contact and social details saved successfully!");
      } else {
        toast.error(res.error || "Failed to update settings");
      }
    } catch {
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCustomLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsSubmittingCustom(true);
    try {
      const res = await createSocialLink({
        platform: customPlatform,
        url: customUrl,
        order: customLinks.length,
      });

      if (res.success && res.link) {
        setCustomLinks([...customLinks, res.link]);
        setCustomUrl("");
        setIsAddingCustom(false);
        toast.success(`Added ${customPlatform} link!`);
      } else {
        toast.error(res.error || "Failed to add social link");
      }
    } catch {
      toast.error("Error adding link");
    } finally {
      setIsSubmittingCustom(false);
    }
  };

  const handleDeleteCustomLink = async (id: string, platform: string) => {
    try {
      const res = await deleteSocialLink(id);
      if (res.success) {
        setCustomLinks(customLinks.filter((l) => l.id !== id));
        toast.success(`Removed ${platform} link`);
      } else {
        toast.error(res.error || "Failed to delete link");
      }
    } catch {
      toast.error("Error deleting link");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="animate-spin text-indigo-600 mb-3" size={36} />
        <p className="text-sm font-medium">Loading contact & social data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          <Share2 size={14} />
          <span>Public Profile Information</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact & Social Information
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Manage the contact channels, availability status, and social media handles displayed across your portfolio footer, contact section, and hero.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ========================================================
            CARD 1: DIRECT CONTACT INFORMATION
           ======================================================== */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Direct Contact Details</h3>
              <p className="text-xs text-slate-500">
                Shown in the Contact bento card, footer, and inquiry responses
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@developer.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Primary email visitors use to reach out directly
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 234-5678"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Optional contact number or WhatsApp link
              </p>
            </div>

            {/* Location & Timezone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Location & Working Timezone
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Worldwide Remote (PST / UTC-8)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Your general base or preferred remote working hours
              </p>
            </div>

            {/* Response Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Expected Response Time
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={formData.responseTime}
                  onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                  placeholder="Within 24 Hours"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Informs clients how quickly you respond
              </p>
            </div>

            {/* Availability Status Badge */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Availability Status Banner Text
              </label>
              <div className="relative">
                <Sparkles
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500"
                />
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="Open to work · Available now for full-time & contract roles"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Displayed in the glowing status badge at the top of the Hero and Contact cards
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 2: SOCIAL MEDIA & DEVELOPER PROFILES
           ======================================================== */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Developer & Social Profiles</h3>
              <p className="text-xs text-slate-500">
                Primary profiles linked in the navigation, hero, contact, and footer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* GitHub */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                GitHub Profile URL
              </label>
              <div className="relative">
                <GithubIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700"
                />
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/yourusername"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {formData.githubUrl && (
                  <a
                    href={formData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <LinkedinIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600"
                />
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/yourusername"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {formData.linkedinUrl && (
                  <a
                    href={formData.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* X / Twitter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                X (Twitter) Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <TwitterIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-500"
                />
                <input
                  type="url"
                  value={formData.twitterUrl}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                  placeholder="https://x.com/yourusername"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {formData.twitterUrl && (
                  <a
                    href={formData.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                YouTube Channel URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <YoutubeIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500"
                />
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/@yourusername"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {formData.youtubeUrl && (
                  <a
                    href={formData.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Personal Website */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Personal Website or Secondary URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Globe
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
                />
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://yourportfolio.dev"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                {formData.websiteUrl && (
                  <a
                    href={formData.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button for Main Form */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-indigo-500/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Details...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Contact & Social Details</span>
              </>
            )}
          </button>

          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Automatic cache invalidation enabled
          </span>
        </div>
      </form>

      {/* ========================================================
          CARD 3: CUSTOM SOCIAL & PLATFORM LINKS (LeetCode, Discord, etc.)
         ======================================================== */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Code2 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Social & Coding Profiles</h3>
              <p className="text-xs text-slate-500">
                Add platforms like LeetCode, HackerRank, Discord, Substack, Dribbble, etc.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>{isAddingCustom ? "Cancel" : "Add Custom Link"}</span>
          </button>
        </div>

        {/* Add custom link inline form */}
        {isAddingCustom && (
          <form
            onSubmit={handleAddCustomLink}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Platform
                </label>
                <select
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {socialPlatforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile URL
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://leetcode.com/u/yourusername"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingCustom}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmittingCustom ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} />
                    <span>Save Link</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Existing custom links list */}
        {customLinks.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs text-slate-400">
              No custom social links added yet. Click &quot;Add Custom Link&quot; to add LeetCode, Medium, Discord, etc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs uppercase shrink-0">
                    {link.platform.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {link.platform}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-slate-500 hover:text-indigo-600 truncate block transition-colors"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Open link"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteCustomLink(link.id, link.platform)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete link"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
