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
  const titles = {
    twitch: "MultiTwitch",
    qsmp: "MultiQSMP",
    purgatory: "MultiQSMP Purgatory",
    frogg: "MultiFrogg",
  };

  return {
    title: titles[env.APP_VARIANT],
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
