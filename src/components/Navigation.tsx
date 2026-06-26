"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-semibold text-[var(--muted)] items-center">
          <Link href="/" className={`transition-colors ${pathname === '/' ? 'text-[var(--foreground)]' : 'hover:text-[var(--foreground)]'}`}>Home</Link>
          <Link href="/about" className={`transition-colors ${pathname === '/about' ? 'text-[var(--foreground)]' : 'hover:text-[var(--foreground)]'}`}>About</Link>
          <Link href="/contact" className={`transition-colors ${pathname === '/contact' ? 'text-[var(--foreground)]' : 'hover:text-[var(--foreground)]'}`}>Contact</Link>
          <ThemeToggle />
          <Link href="/create" className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md transition-colors ml-2">Write a Post</Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={toggleMenu}
            className="p-2 text-[var(--foreground)] hover:bg-[var(--border)] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-[88px] left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)] md:hidden shadow-xl">
          <nav className="flex flex-col p-4 gap-4 text-sm font-semibold text-[var(--muted)]">
            <Link 
              href="/" 
              onClick={closeMenu}
              className={`p-3 rounded-md transition-colors ${pathname === '/' ? 'bg-[var(--border)] text-[var(--foreground)]' : 'hover:bg-[var(--card-bg)] hover:text-[var(--foreground)]'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={closeMenu}
              className={`p-3 rounded-md transition-colors ${pathname === '/about' ? 'bg-[var(--border)] text-[var(--foreground)]' : 'hover:bg-[var(--card-bg)] hover:text-[var(--foreground)]'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMenu}
              className={`p-3 rounded-md transition-colors ${pathname === '/contact' ? 'bg-[var(--border)] text-[var(--foreground)]' : 'hover:bg-[var(--card-bg)] hover:text-[var(--foreground)]'}`}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-[var(--border)] mt-2">
              <Link 
                href="/create" 
                onClick={closeMenu}
                className="flex justify-center p-3 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-md transition-colors"
              >
                Write a Post
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
