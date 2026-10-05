"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";

export const getSettings = unstable_cache(
  async () => {
    try {
      let settings = await prisma.settings.findUnique({
        where: { id: "default" },
      });

      if (!settings) {
        settings = await prisma.settings.create({
          data: {
            id: "default",
            siteName: "Developer Portfolio",
            siteDescription: "Full Stack Developer Portfolio",
            heroTitle: "Hi, I'm a Full Stack Developer",
            heroSubtitle: "Associate Software Engineer",
            aboutText: "Passionate software engineer building modern web applications.",
          },
        });
      }

      return settings;
    } catch (error) {
      console.error("Error getting settings:", error);
      return null;
    }
  },
  ["site-settings"],
  { revalidate: 60, tags: ["settings"] }
);

export type SettingsUpdateInput = {
  siteName?: string;
  siteDescription?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  resumeUrl?: string;
  profileImage?: string;
  analyticsId?: string;
  // Contact
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
  responseTime?: string;
  // Social
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  websiteUrl?: string;
};

export async function updateSettings(data: SettingsUpdateInput) {
  try {
    const cleanData: any = {};
    if (data.siteName !== undefined) cleanData.siteName = data.siteName;
    if (data.siteDescription !== undefined) cleanData.siteDescription = data.siteDescription;
    if (data.heroTitle !== undefined) cleanData.heroTitle = data.heroTitle;
    if (data.heroSubtitle !== undefined) cleanData.heroSubtitle = data.heroSubtitle;
    if (data.aboutText !== undefined) cleanData.aboutText = data.aboutText;
    if (data.resumeUrl !== undefined) cleanData.resumeUrl = data.resumeUrl;
    if (data.profileImage !== undefined) cleanData.profileImage = data.profileImage;
    if (data.analyticsId !== undefined) cleanData.analyticsId = data.analyticsId;
    if (data.email !== undefined) cleanData.email = data.email;
    if (data.phone !== undefined) cleanData.phone = data.phone;
    if (data.location !== undefined) cleanData.location = data.location;
    if (data.availability !== undefined) cleanData.availability = data.availability;
    if (data.responseTime !== undefined) cleanData.responseTime = data.responseTime;
    if (data.githubUrl !== undefined) cleanData.githubUrl = data.githubUrl;
    if (data.linkedinUrl !== undefined) cleanData.linkedinUrl = data.linkedinUrl;
    if (data.twitterUrl !== undefined) cleanData.twitterUrl = data.twitterUrl;
    if (data.youtubeUrl !== undefined) cleanData.youtubeUrl = data.youtubeUrl;
    if (data.websiteUrl !== undefined) cleanData.websiteUrl = data.websiteUrl;

    const settings = await prisma.settings.upsert({
      where: { id: "default" },
      update: cleanData,
      create: {
        id: "default",
        siteName: data.siteName || "Developer Portfolio",
        siteDescription: data.siteDescription || "Full Stack Developer Portfolio",
        heroTitle: data.heroTitle || "Hi, I'm a Full Stack Developer",
        heroSubtitle: data.heroSubtitle || "Associate Software Engineer",
        aboutText: data.aboutText || "Passionate software engineer building modern web applications.",
        resumeUrl: data.resumeUrl,
        profileImage: data.profileImage,
        analyticsId: data.analyticsId,
        email: data.email,
        phone: data.phone,
        location: data.location,
        availability: data.availability,
        responseTime: data.responseTime,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        twitterUrl: data.twitterUrl,
        youtubeUrl: data.youtubeUrl,
        websiteUrl: data.websiteUrl,
      },
    });

    try {
      revalidatePath("/dashboard/settings");
      revalidatePath("/dashboard/contact-social");
      revalidatePath("/");
      revalidatePath("/contact");
    } catch {
      // Ignore if called outside of active request context
    }
    return { success: true, settings };
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message || "Failed to update settings" };
  }
}
