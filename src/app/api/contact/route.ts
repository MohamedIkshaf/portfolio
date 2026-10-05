import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/actions/contact.actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Delegate creation to contact domain service
    const result = await createContactMessage(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, id: result.message?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
