"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { blogSchema, type BlogFormData } from "@/lib/validations";

export const getBlogCount = unstable_cache(
  async () => {
    try {
      return await prisma.blog.count();
    } catch (error) {
      console.error("Error getting blog count:", error);
      return 0;
    }
  },
  ["blog-count"],
  { revalidate: 60, tags: ["blogs"] }
);

export async function getBlogs() {
  try {
    return await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true, tags: true },
    });
  } catch (error) {
    console.error("Error getting blogs:", error);
    return [];
  }
}

export const getPublishedBlogs = unstable_cache(
  async () => {
    try {
      return await prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { category: true, tags: true },
      });
    } catch (error) {
      console.error("Error getting published blogs:", error);
      return [];
    }
  },
  ["published-blogs"],
  { revalidate: 60, tags: ["blogs"] }
);

export const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.blog.findUnique({
        where: { slug },
        include: { category: true, tags: true },
      });
    } catch (error) {
      console.error("Error getting blog by slug:", error);
      return null;
    }
  },
  ["blog-by-slug"],
  { revalidate: 60, tags: ["blogs"] }
);

export async function createBlog(data: BlogFormData) {
  try {
    const validated = blogSchema.parse(data);
    const blog = await prisma.blog.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        excerpt: validated.excerpt,
        content: validated.content,
        coverImage: validated.coverImage,
        readingTime: validated.readingTime || 5,
        published: validated.published || false,
        featured: validated.featured || false,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/dashboard/blogs");
    revalidatePath("/");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return { success: false, error: error.message || "Failed to create blog" };
  }
}

export async function updateBlog(id: string, data: Partial<BlogFormData>) {
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data,
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/dashboard/blogs");
    revalidatePath("/");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return { success: false, error: error.message || "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({
      where: { id },
    });

    revalidatePath("/blog");
    revalidatePath("/dashboard/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return { success: false, error: error.message || "Failed to delete blog" };
  }
}
