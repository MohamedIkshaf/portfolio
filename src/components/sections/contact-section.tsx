"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Globe,
  GitBranch,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export function ContactSection({ settings }: { settings?: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 6000);
      }
    } catch {
      // Handled silently
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactEmail = settings?.email || "contact@portfolio.dev";

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#fbf9ef] dark:bg-[#121210]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col items-start mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
              <Sparkles size={13} className="text-[#ffae00]" />
              <span>START A CONVERSATION</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] max-w-3xl leading-[1.05]">
              Let's create something <span className="text-[#5f1cfc]">extraordinary</span> together.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-2xl leading-relaxed">
              Whether you need a full-time software engineer, a high-converting web application, or a scalable technical architecture, I'd love to hear from you.
            </p>
          </div>
        </FadeIn>

        {/* Bento Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Contact Info Bento Card (5 cols) */}
          <FadeIn className="lg:col-span-5">
            <div className="bento-card p-6 sm:p-9 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#15803d] dark:text-[#22c55e] text-xs font-semibold mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-[#22c55e]" />
                  <span>{settings?.availability || "Available for immediate kickoff"}</span>
                </div>

                <h3 className="font-heading font-black text-2xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5f1cfc]/10 text-[#5f1cfc] shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#888880] block mb-0.5">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="font-heading font-bold text-base text-[#1a1a1a] dark:text-[#fbf9ef] hover:text-[#5f1cfc] transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  {settings?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#22c55e]/15 text-[#15803d] dark:text-[#22c55e] shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#888880] block mb-0.5">
                          Phone / WhatsApp
                        </span>
                        <a
                          href={`tel:${settings.phone}`}
                          className="font-heading font-bold text-base text-[#1a1a1a] dark:text-[#fbf9ef] hover:text-[#5f1cfc] transition-colors"
                        >
                          {settings.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffae00]/15 text-[#ff9500] shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#888880] block mb-0.5">
                        Response Time
                      </span>
                      <p className="font-heading font-bold text-sm text-[#1a1a1a] dark:text-[#fbf9ef]">
                        {settings?.responseTime || "Within 24 Hours"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1a1a1a]/10 dark:bg-white/10 text-[#1a1a1a] dark:text-[#fbf9ef] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#888880] block mb-0.5">
                        Location & Timezone
                      </span>
                      <p className="font-heading font-bold text-sm text-[#1a1a1a] dark:text-[#fbf9ef]">
                        {settings?.location || "Worldwide Remote (Flexible Hours)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links row */}
              <div className="pt-8 mt-8 border-t border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888880] block mb-3">
                  Connect on Socials
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={settings?.githubUrl || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all"
                  >
                    <GitBranch size={13} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={settings?.linkedinUrl || "https://linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all"
                  >
                    <Globe size={13} />
                    <span>LinkedIn</span>
                  </a>
                  {settings?.twitterUrl && (
                    <a
                      href={settings.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all"
                    >
                      <Globe size={13} />
                      <span>X (Twitter)</span>
                    </a>
                  )}
                  {settings?.youtubeUrl && (
                    <a
                      href={settings.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all"
                    >
                      <Globe size={13} />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Message Form (7 cols) */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <div className="bento-card p-6 sm:p-10 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#22c55e]/15 text-[#22c55e] mb-5">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-heading font-black text-2xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
                      Message Received!
                    </h3>
                    <p className="text-sm text-[#555550] dark:text-[#c5c4b8] max-w-sm">
                      Thank you for reaching out. I'll review your inquiry and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <h3 className="font-heading font-black text-2xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-1">
                        Send a Message
                      </h3>
                      <p className="text-xs text-[#888880] mb-6">
                        Fill out the details below and I'll respond directly to your email.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className="w-full px-4 py-3 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#1a1a1a] dark:text-[#fbf9ef] text-sm focus:outline-none focus:border-[#5f1cfc] focus:ring-2 focus:ring-[#5f1cfc]/20 transition-all"
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-[#ff352e]">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className="w-full px-4 py-3 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#1a1a1a] dark:text-[#fbf9ef] text-sm focus:outline-none focus:border-[#5f1cfc] focus:ring-2 focus:ring-[#5f1cfc]/20 transition-all"
                          placeholder="you@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-[#ff352e]">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
                        Subject <span className="text-[#888880] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        {...register("subject")}
                        className="w-full px-4 py-3 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#1a1a1a] dark:text-[#fbf9ef] text-sm focus:outline-none focus:border-[#5f1cfc] focus:ring-2 focus:ring-[#5f1cfc]/20 transition-all"
                        placeholder="Project inquiry or full-stack opportunity"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
                        Message Details
                      </label>
                      <textarea
                        rows={4}
                        {...register("message")}
                        className="w-full px-4 py-3 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#1a1a1a] dark:text-[#fbf9ef] text-sm focus:outline-none focus:border-[#5f1cfc] focus:ring-2 focus:ring-[#5f1cfc]/20 transition-all resize-none"
                        placeholder="Tell me about your product vision, timeline, and tech requirements..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-[#ff352e]">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] text-white font-heading font-bold text-sm tracking-wide hover:bg-[#5f1cfc] transition-all shadow-sm hover:shadow-[0_10px_25px_-4px_rgba(95,28,252,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
