"use client";

import "./global.css";

import { useEffect } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Script from "next/script";

import { siteConfig, errorLinks } from "@/config/site";

import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";
import { RootProvider } from "fumadocs-ui/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  House,
  LayoutDashboard,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function getIcon(name: string) {
  switch (name.toLowerCase()) {
    case "home":
    case "dashboard":
      return <LayoutDashboard className="w-6 h-6" />;
    case "documentation":
      return <BookOpen className="w-6 h-6" />;
    case "scout":
      return <ClipboardList className="w-6 h-6" />;
    default:
      return <House className="w-6 h-6" />;
  }
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Error - {siteConfig.name.default}</title>
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
      </head>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "saffron"]}
        >
          <Header />
          <RootProvider>
            <div className="flex items-center justify-center h-[calc(100vh-130px)] bg-background min-h-[500px]">
              <div className="w-full max-w-2xl px-4 py-12">
                <h2 className="text-primary text-4xl font-bold text-center mb-4">
                  Oops!
                </h2>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Something went wrong
                </h1>
                <p className="text-lg md:text-xl text-center mb-8 text-muted-foreground">
                  We're sorry, an unexpected error occurred.
                </p>
                <div className="flex justify-center mb-12">
                  <Button onClick={() => reset()} variant="outline">
                    Try again
                  </Button>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {errorLinks.map((link, index) => (
                    <Link
                      key={`${link.name}-${index}`}
                      href={link.href}
                      className="flex items-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-6 h-6 mr-4 text-primary">
                        {getIcon(link.name)}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{link.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </RootProvider>
          <SpeedInsights />
          <Analytics />
          <Toaster richColors position="bottom-center" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
