import { ThemeProvider } from "@/components/theme-provider";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans as FontSans } from "next/font/google";
import "../styles/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = {
    twitch: {
      title: "MultiTwitch",
      description: "",
    },
    qsmp: {
      title: "MultiQSMP",
      description: "A website to watch all QSMP streamers at the same time.",
    },
    purgatory: {
      title: "MultiQSMP Purgatory",
      description:
        "A website to watch all QSMP Purgatory streamers at the same time.",
    },
    frogg: {
      title: "MultiFrogg",
      description:
        "A website to watch all Frogg SMP streamers at the same time.",
    },
  };

  return {
    title: t[env.APP_VARIANT].title,
    description: t[env.APP_VARIANT].description,
    icons: {
      icon: `/favicon-${env.APP_VARIANT}.ico`,
    },
    twitter: {
      card: "summary_large_image",
      title: t[env.APP_VARIANT].title,
      description: t[env.APP_VARIANT].description,
      site: "@feeeyli",
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
