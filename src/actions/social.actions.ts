"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { socialLinkSchema, type SocialLinkFormData } from "@/lib/validations";

export const getSocialLinks = unstable_cache(
  async () => {
    try {
      return await prisma.socialLink.findMany({
        orderBy: { order: "asc" },
      });
    } catch (error) {
      console.error("Error getting social links:", error);
      return [];
    }
  },
  ["all-social-links"],
  { revalidate: 60, tags: ["social_links"] }
);

export async function createSocialLink(data: SocialLinkFormData) {
  try {
    const validated = socialLinkSchema.parse(data);
    const link = await prisma.socialLink.create({
      data: {
        platform: validated.platform,
        url: validated.url,
        icon: validated.icon || null,
        order: validated.order || 0,
      },
    });

    try {
      revalidatePath("/dashboard/contact-social");
      revalidatePath("/dashboard/settings");
      revalidatePath("/");
    } catch {
      // Ignore outside of request context
    }
    return { success: true, link };
  } catch (error: any) {
    console.error("Error creating social link:", error);
    return { success: false, error: error.message || "Failed to create social link" };
  }
}

export async function updateSocialLink(id: string, data: Partial<SocialLinkFormData>) {
  try {
    const link = await prisma.socialLink.update({
      where: { id },
      data,
    });

    try {
      revalidatePath("/dashboard/contact-social");
      revalidatePath("/dashboard/settings");
      revalidatePath("/");
    } catch {
      // Ignore outside of request context
    }
    return { success: true, link };
  } catch (error: any) {
    console.error("Error updating social link:", error);
    return { success: false, error: error.message || "Failed to update social link" };
  }
}

export async function deleteSocialLink(id: string) {
  try {
    await prisma.socialLink.delete({
      where: { id },
    });

    try {
      revalidatePath("/dashboard/contact-social");
      revalidatePath("/dashboard/settings");
      revalidatePath("/");
    } catch {
      // Ignore outside of request context
    }
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting social link:", error);
    return { success: false, error: error.message || "Failed to delete social link" };
  }
}
