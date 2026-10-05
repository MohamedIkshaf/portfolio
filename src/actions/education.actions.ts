"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { educationSchema, type EducationFormData } from "@/lib/validations";

export const getEducation = unstable_cache(
  async () => {
    try {
      return await prisma.education.findMany({
        orderBy: { startDate: "desc" },
      });
    } catch (error) {
      console.error("Error getting education:", error);
      return [];
    }
  },
  ["all-education"],
  { revalidate: 60, tags: ["education"] }
);

export async function createEducation(data: EducationFormData) {
  try {
    const validated = educationSchema.parse(data);
    const education = await prisma.education.create({
      data: {
        degree: validated.degree,
        institution: validated.institution,
        location: validated.location,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        description: validated.description || "",
        order: validated.order || 0,
      },
    });

    revalidatePath("/dashboard/education");
    revalidatePath("/");
    return { success: true, education };
  } catch (error: any) {
    console.error("Error creating education:", error);
    return { success: false, error: error.message || "Failed to create education" };
  }
}

export async function updateEducation(id: string, data: Partial<EducationFormData>) {
  try {
    const updateData: any = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;

    const education = await prisma.education.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/dashboard/education");
    revalidatePath("/");
    return { success: true, education };
  } catch (error: any) {
    console.error("Error updating education:", error);
    return { success: false, error: error.message || "Failed to update education" };
  }
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({
      where: { id },
    });

    revalidatePath("/dashboard/education");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting education:", error);
    return { success: false, error: error.message || "Failed to delete education" };
  }
}
