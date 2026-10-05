import { Metadata } from "next";
import { ContactSocialForm } from "@/components/forms/contact-social-form";

export const metadata: Metadata = {
  title: "Contact & Social Information | Dashboard",
  description: "Manage portfolio contact information, availability status, and social profiles.",
};

export default function DashboardContactSocialPage() {
  return <ContactSocialForm />;
}
