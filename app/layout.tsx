import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { MainNav } from "@/components/main-nav";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import AuthMenu from "@/components/auth-menu";
import { createClient } from "@/lib/supabase/server";
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from "@/components/footer";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Indonesiaku",
	description: "Preserving Indonesia's Languages Together",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
				<GoogleAnalytics gaId="G-GR14KZBHS4" />
			</head>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<div className="container flex h-14 max-w-screen-2xl items-center">
							<MainNav />
							<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end mr-4">
								<AuthMenu />
							</div>
						</div>
					</header>
					<main className="h-full min-h-screen flex flex-col items-center">
						{children}
					</main>
					<Footer />
				</body>
		</html>
	);
}

{
	/* <Link
  href={siteConfig.links.github}
  target="_blank"
  rel="noreferrer"
>
  <div
    className={cn(
      buttonVariants({
        variant: "ghost",
      }),
      "h-8 w-8 px-0 mr-4"
    )}
  >
    <Icons.gitHub className="h-6 w-6" />
    <span className="sr-only">
      GitHub
    </span>
  </div>
</Link> */
}
