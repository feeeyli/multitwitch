import type { Metadata } from "next";
import "./globals.css";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "MultiTwitch",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"dark min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
