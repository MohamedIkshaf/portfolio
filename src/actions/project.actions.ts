"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { projectSchema, type ProjectFormData } from "@/lib/validations";

export const getProjectCount = unstable_cache(
  async () => {
    try {
      return await prisma.project.count();
    } catch (error) {
      console.error("Error getting project count:", error);
      return 0;
    }
  },
  ["project-count"],
  { revalidate: 60, tags: ["projects"] }
);

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { order: "asc" },
      include: { category: true },
    });
  } catch (error) {
    console.error("Error getting projects:", error);
    return [];
  }
}

export const getFeaturedProjects = unstable_cache(
  async () => {
    try {
      return await prisma.project.findMany({
        where: { status: "PUBLISHED", featured: true },
        orderBy: { order: "asc" },
        take: 6,
        include: { category: true },
      });
    } catch (error) {
      console.error("Error getting featured projects:", error);
      return [];
    }
  },
  ["featured-projects"],
  { revalidate: 60, tags: ["projects"] }
);

export const getPublishedProjects = unstable_cache(
  async () => {
    try {
      return await prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
        include: { category: true },
      });
    } catch (error) {
      console.error("Error getting published projects:", error);
      return [];
    }
  },
  ["published-projects"],
  { revalidate: 60, tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.project.findUnique({
        where: { slug },
        include: { category: true },
      });
    } catch (error) {
      console.error("Error getting project by slug:", error);
      return null;
    }
  },
  ["project-by-slug"],
  { revalidate: 60, tags: ["projects"] }
);

export async function getProjectById(id: string) {
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: { category: true },
    });
  } catch (error) {
    console.error("Error getting project by id:", error);
    return null;
  }
}

export async function createProject(data: ProjectFormData) {
  try {
    const validated = projectSchema.parse(data);
    const project = await prisma.project.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        content: validated.content || "",
        coverImage: validated.coverImage,
        gallery: validated.gallery || [],
        techStack: validated.techStack,
        features: validated.features || [],
        architecture: validated.architecture,
        challenges: validated.challenges,
        lessons: validated.lessons,
        githubUrl: validated.githubUrl,
        liveUrl: validated.liveUrl,
        status: validated.status || "DRAFT",
        featured: validated.featured || false,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProject(id: string, data: Partial<ProjectFormData>) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message || "Failed to delete project" };
  }
}
