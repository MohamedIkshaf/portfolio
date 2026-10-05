"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export async function getUnreadContactCount() {
  try {
    return await prisma.contactMessage.count({ where: { read: false } });
  } catch (error) {
    console.error("Error getting unread contact count:", error);
    return 0;
  }
}

export async function getRecentContactMessages(take = 5) {
  try {
    return await prisma.contactMessage.findMany({
      take,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error getting recent contact messages:", error);
    return [];
  }
}

export async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error getting contact messages:", error);
    return [];
  }
}

export async function createContactMessage(data: ContactFormData) {
  try {
    const validated = contactSchema.parse(data);
    const message = await prisma.contactMessage.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject || "",
        message: validated.message,
      },
    });

    revalidatePath("/dashboard/messages");
    revalidatePath("/dashboard");
    return { success: true, message };
  } catch (error: any) {
    console.error("Error creating contact message:", error);
    return { success: false, error: error.message || "Failed to save contact message" };
  }
}

export async function toggleMessageRead(id: string, read: boolean) {
  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    });

    revalidatePath("/dashboard/messages");
    revalidatePath("/dashboard");
    return { success: true, message };
  } catch (error: any) {
    console.error("Error toggling message read:", error);
    return { success: false, error: error.message || "Failed to update message" };
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/dashboard/messages");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting contact message:", error);
    return { success: false, error: error.message || "Failed to delete message" };
  }
}
