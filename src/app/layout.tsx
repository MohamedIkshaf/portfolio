import type { Metadata } from "next";
import { Poppins, Work_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const poppins = Poppins({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const workSans = Work_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Developer Portfolio | Full-Stack Software Engineer",
    template: "%s | Developer Portfolio",
  },
  description:
    "Full-Stack Software Engineer crafting modern web experiences with React, Next.js, TypeScript, and Node.js. High performance, pixel-perfect design.",
  keywords: [
    "full stack developer",
    "software engineer",
    "react developer",
    "next.js developer",
    "typescript",
    "portfolio",
    "web developer",
  ],
  authors: [{ name: "Developer" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Developer Portfolio",
    title: "Developer Portfolio | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer crafting modern web applications with cutting-edge technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Portfolio",
    description:
      "Full-Stack Software Engineer crafting modern web applications with cutting-edge technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#fbf9ef] dark:bg-[#121210] text-[#1a1a1a] dark:text-[#fbf9ef] antialiased selection:bg-[#5f1cfc] selection:text-white transition-colors duration-200">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#ffffff",
                border: "1.5px solid rgba(26, 26, 26, 0.08)",
                color: "#1a1a1a",
                borderRadius: "16px",
                boxShadow: "0 10px 30px -4px rgba(0,0,0,0.08)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
