import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Blog",
  description: "A high-quality Next.js blog application with SSR and React Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col selection:bg-purple-500/30`}>
        <Providers>
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col min-h-screen">
            <header className="flex items-center justify-between py-6 border-b border-white/10 mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Beyond Blog
              </h1>
              <nav className="flex gap-8 text-sm font-medium text-slate-300 items-center">
                <a href="/" className="hover:text-white transition-colors duration-200">Home</a>
                <a href="/about" className="hover:text-white transition-colors duration-200">About</a>
                <a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a>
                <a href="/create" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200">Write a Post</a>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="py-8 text-center text-sm text-slate-500 mt-20 border-t border-white/10">
              © {new Date().getFullYear()} Beyond Blog. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
