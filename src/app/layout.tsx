import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Serif, Inter, Lustria, Pinyon_Script, Reem_Kufi } from "next/font/google";
import { RevealScript } from "@/components/Reveal";
import { site } from "@/content/site";
import "./globals.css";

const lustria = Lustria({ weight: "400", subsets: ["latin"], variable: "--font-lustria", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap", axes: ["opsz"] });
const reem = Reem_Kufi({ subsets: ["latin"], variable: "--font-reem", display: "swap" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.couple.displayName} · ${site.date.short}`, template: `%s · ${site.couple.displayName}` },
  description: `Join ${site.couple.displayName} at ${site.venue.name} on ${site.date.long}.`,
  // Keep the couple's existing no-search-engine preference. Noindex is not access control.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    title: `${site.couple.displayName} · ${site.date.short}`,
    description: `${site.venue.name} · ${site.venue.city}`,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = { themeColor: "#f6f0e8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [lustria, inter, instrument, bodoni, reem, pinyon].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body>
        <RevealScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
