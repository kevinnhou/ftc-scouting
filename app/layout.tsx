import "./global.css";

import type { Viewport } from "next";

import { Poppins } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";
import { metadata } from "@/app/metadata";

import { siteConfig } from "@/config/site";

import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const checkLocalStorage = cookieStore.get("checkLocalStorage");

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["WebApplication", "SoftwareApplication"],
              name: siteConfig.name.default,
              url: siteConfig.links.url,
              description: siteConfig.description,
              applicationCategory: "UtilitiesApplication",
              applicationSubCategory: "ScoutingApplication",
              creator: {
                "@type": "Person",
                name: siteConfig.creator.name,
                url: siteConfig.creator.links,
              },
              keywords: siteConfig.keywords.join(", "),
              inLanguage: "en-AU",
              operatingSystem: "Any",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: 5,
                ratingCount: 42,
              },
              offers: {
                "@type": "Offer",
                price: 0,
                priceCurrency: "USD",
              },
              icon: "/favicon.ico",
              mainEntityOfPage: siteConfig.links.url,
            }),
          }}
        />
        {checkLocalStorage && (
          <Script strategy="beforeInteractive">
            {`
              if (localStorage.getItem('formSubmissions')) {
                document.cookie = 'hasFormSubmissions=true; path=/';
                window.location.href = '/scout';
              }
            `}
          </Script>
        )}
      </head>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="saffron"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "saffron"]}
        >
          <Header />
          <RootProvider>{children}</RootProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster richColors position="bottom-center" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
