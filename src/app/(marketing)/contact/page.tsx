import { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { getSettings } from "@/actions/settings.actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for collaboration, job opportunities, or just to say hello.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="pt-20">
      <ContactSection settings={settings} />
    </div>
  );
}
