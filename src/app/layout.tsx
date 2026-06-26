import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Menu } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-geist-sans" 
});

export const metadata: Metadata = {
  title: "Astrobyte",
  description: "Insights & Ideas on web development, space, and the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className={`${inter.variable} bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col selection:bg-[var(--accent)]/30 transition-colors duration-300 font-sans`}>
        <Providers>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
            <header className="flex items-center justify-between py-6 mb-12 border-b border-[var(--border)]">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Astrobyte
                </span>
              </Link>

              <div className="flex items-center gap-6">
                <nav className="hidden md:flex gap-6 text-sm font-semibold text-[var(--muted)] items-center">
                  <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
                  <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
                  <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</Link>
                  <ThemeToggle />
                  <Link href="/create" className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md transition-colors ml-2">Write a Post</Link>
                </nav>
                <button className="md:hidden p-2 text-[var(--foreground)] hover:bg-[var(--border)] rounded-md">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </header>

            <main className="flex-1">{children}</main>
            
            <footer className="py-12 text-center text-sm font-medium text-[var(--muted)] mt-20 border-t border-[var(--border)]">
              © {new Date().getFullYear()} Astrobyte. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
