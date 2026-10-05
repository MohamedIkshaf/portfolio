import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarketingClientWidgets } from "@/components/layout/marketing-client-widgets";
import { getSettings } from "@/actions/settings.actions";

/**
 * Marketing layout — wraps all public-facing pages
 * with the Navbar, Footer, and client accessories.
 */
export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <MarketingClientWidgets />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
