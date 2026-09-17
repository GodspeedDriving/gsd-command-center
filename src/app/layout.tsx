import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import { business } from "@/config/business";
import { UtmCapture } from "@/components/utm-capture";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.shortName} — ${business.tagline}`,
    template: `%s — ${business.shortName}`,
  },
  description: business.enrollmentHeadline,
  openGraph: {
    title: `${business.shortName} — ${business.tagline}`,
    description: business.enrollmentHeadline,
    url: siteUrl,
    siteName: business.shortName,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.shortName} — ${business.tagline}`,
    description: business.enrollmentHeadline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <UtmCapture />
      </body>
    </html>
  );
}
