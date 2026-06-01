'use client';

import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import AuthNav from '@/components/shared/AuthNav';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/deals', label: '🔥 Deals' },
  { href: '/categories', label: 'Categories' },
  { href: '/categories/ai-gadgets', label: 'AI Gadgets' },
  { href: '/categories/creator-tools', label: 'Creator Gear' },
  { href: '/categories/mini-pcs', label: 'Mini PCs' },
  { href: '/categories/laser-engravers', label: 'Laser Engravers' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <div className="h-[112px] lg:h-[130px]"></div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
        <div className="border-b border-amber-900/20 bg-[#24170f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-[11px] font-semibold tracking-[0.16em] uppercase">
            <span className="hidden sm:inline text-amber-100/80">Independent Reviews · Editorial Picks · Weekly Notes</span>
            <div className="flex items-center gap-4 text-amber-50/70">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/categories" className="hover:text-white transition-colors">Sitemap</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            </div>
          </div>
        </div>

        <div className={`border-b border-stone-300/80 bg-[#fbf8f1]/95 dark:bg-gray-900/95 dark:border-gray-800 backdrop-blur transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-800/20 bg-amber-700 text-white shadow-sm">
                <span className="text-lg font-extrabold">T</span>
              </div>
              <div className="flex flex-col">
                <span className={`wp-title font-bold text-gray-900 dark:text-white leading-tight ${isScrolled ? 'text-[1.45rem]' : 'text-[1.7rem]'}`}>
                  Tech<span className="text-amber-700 dark:text-amber-400">Review</span>Hub
                </span>
                <span className="hidden sm:block text-[10px] font-semibold tracking-[0.26em] text-stone-500 dark:text-gray-400 leading-none uppercase">
                  Static Blog Theme · Reviews · Comparisons · Guides
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 rounded-full border border-stone-300 bg-white/90 px-2 py-1 shadow-sm dark:border-gray-700 dark:bg-gray-800/90">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <AuthNav />
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-full border border-stone-300 bg-white/80 hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-800">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-stone-300 bg-white/80 hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-800 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[3px] bg-stone-200 dark:bg-gray-800 relative">
          <div
            className="h-full bg-gradient-to-r from-amber-700 via-blue-600 to-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-b border-stone-300 bg-[#fbf8f1] dark:bg-gray-900 dark:border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-gray-800 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <AuthNav mobile />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
