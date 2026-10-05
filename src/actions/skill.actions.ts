"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { skillSchema, type SkillFormData } from "@/lib/validations";

export const getSkillCount = unstable_cache(
  async () => {
    try {
      return await prisma.skill.count();
    } catch (error) {
      console.error("Error getting skill count:", error);
      return 0;
    }
  },
  ["skill-count"],
  { revalidate: 60, tags: ["skills"] }
);

export const getSkills = unstable_cache(
  async () => {
    try {
      return await prisma.skill.findMany({
        orderBy: { order: "asc" },
      });
    } catch (error) {
      console.error("Error getting skills:", error);
      return [];
    }
  },
  ["all-skills"],
  { revalidate: 60, tags: ["skills"] }
);

export async function createSkill(data: SkillFormData) {
  try {
    const validated = skillSchema.parse(data);
    const skill = await prisma.skill.create({
      data: {
        name: validated.name,
        icon: validated.icon || "code",
        proficiency: validated.proficiency,
        category: validated.category,
        order: validated.order || 0,
      },
    });

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true, skill };
  } catch (error: any) {
    console.error("Error creating skill:", error);
    return { success: false, error: error.message || "Failed to create skill" };
  }
}

export async function updateSkill(id: string, data: Partial<SkillFormData>) {
  try {
    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true, skill };
  } catch (error: any) {
    console.error("Error updating skill:", error);
    return { success: false, error: error.message || "Failed to update skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/dashboard/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting skill:", error);
    return { success: false, error: error.message || "Failed to delete skill" };
  }
}
