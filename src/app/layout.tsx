import { ThemeProvider } from "@/components/theme-provider";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans as FontSans, Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

const fontKoreanSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-korean-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = {
    twitch: {
      title: "MultiTwitch",
      description: "",
      url: "https://multitwitch.vercel.app",
    },
    qsmp: {
      title: "MultiQSMP",
      description: "A website to watch all QSMP streamers at the same time.",
      url: "https://multiqsmp.vercel.app",
    },
    purgatory: {
      title: "MultiQSMP Purgatory",
      description:
        "A website to watch all QSMP Purgatory streamers at the same time.",
      url: "https://multipurgatory.vercel.app",
    },
    frogg: {
      title: "MultiFrogg",
      description:
        "A website to watch all Frogg SMP streamers at the same time.",
      url: "https://multifrogg.vercel.app",
    },
  };

  return {
    title: t[env.APP_VARIANT].title,
    description: t[env.APP_VARIANT].description,
    icons: {
      icon: `/favicon/favicon-${env.APP_VARIANT}.ico`,
    },
    twitter: {
      card: "summary_large_image",
      title: t[env.APP_VARIANT].title,
      description: t[env.APP_VARIANT].description,
      site: "@feeeyli",
      siteId: "1503016829379399685",
      creatorId: "1503016829379399685",
      creator: "@feeeyli",
      images: {
        url: `/og/og-${env.APP_VARIANT}.png`,
        alt: t[env.APP_VARIANT].title,
      },
    },
    openGraph: {
      title: t[env.APP_VARIANT].title,
      description: t[env.APP_VARIANT].description,
      url: t[env.APP_VARIANT].url,
      siteName: t[env.APP_VARIANT].title,
      images: {
        url: `/og/og-${env.APP_VARIANT}.png`,
        width: 1200,
        height: 630,
        alt: t[env.APP_VARIANT].title,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-light font-sans antialiased",
          fontSans.variable,
          fontKoreanSans.variable,
          env.APP_VARIANT
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
