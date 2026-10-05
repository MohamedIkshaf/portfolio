"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCertificates() {
  try {
    return await prisma.certificate.findMany({
      orderBy: { issueDate: "desc" },
    });
  } catch (error) {
    console.error("Error getting certificates:", error);
    return [];
  }
}

export async function createCertificate(data: {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
}) {
  try {
    const certificate = await prisma.certificate.create({
      data: {
        title: data.title,
        issuer: data.issuer,
        issueDate: new Date(data.issueDate),
        credentialUrl: data.credentialUrl || null,
        image: data.image || null,
      },
    });

    revalidatePath("/dashboard/certificates");
    revalidatePath("/");
    return { success: true, certificate };
  } catch (error: any) {
    console.error("Error creating certificate:", error);
    return { success: false, error: error.message || "Failed to create certificate" };
  }
}

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({
      where: { id },
    });

    revalidatePath("/dashboard/certificates");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting certificate:", error);
    return { success: false, error: error.message || "Failed to delete certificate" };
  }
}
