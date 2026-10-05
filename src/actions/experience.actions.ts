"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { experienceSchema, type ExperienceFormData } from "@/lib/validations";

export const getExperiences = unstable_cache(
  async () => {
    try {
      return await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
      });
    } catch (error) {
      console.error("Error getting experiences:", error);
      return [];
    }
  },
  ["all-experiences"],
  { revalidate: 60, tags: ["experiences"] }
);

export async function createExperience(data: ExperienceFormData) {
  try {
    const validated = experienceSchema.parse(data);
    const experience = await prisma.experience.create({
      data: {
        title: validated.title,
        company: validated.company,
        location: validated.location,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        description: validated.description || "",
        current: validated.current || false,
        order: validated.order || 0,
      },
    });

    revalidatePath("/dashboard/experience");
    revalidatePath("/");
    return { success: true, experience };
  } catch (error: any) {
    console.error("Error creating experience:", error);
    return { success: false, error: error.message || "Failed to create experience" };
  }
}

export async function updateExperience(id: string, data: Partial<ExperienceFormData>) {
  try {
    const updateData: any = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/dashboard/experience");
    revalidatePath("/");
    return { success: true, experience };
  } catch (error: any) {
    console.error("Error updating experience:", error);
    return { success: false, error: error.message || "Failed to update experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/dashboard/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    return { success: false, error: error.message || "Failed to delete experience" };
  }
}
