'use client';

import Link from 'next/link';
import { Search, Menu, X, Sun, Moon, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { createClient, isConfigured } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (!isConfigured) return;
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <>
      <div className="h-[104px] lg:h-[116px]"></div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="bg-gray-900 dark:bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
            <span className="hidden sm:inline text-gray-400">Your trusted source for honest tech reviews</span>
            <div className="flex items-center gap-4 text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/categories" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">T</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-extrabold text-gray-900 dark:text-white leading-tight ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                  Tech<span className="text-blue-600 dark:text-blue-400">Review</span>Hub
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none hidden sm:block">REVIEWS · COMPARISONS · GUIDES</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {isConfigured && (
                user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{displayName.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">{displayName}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <Link
                        href="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-700 dark:text-gray-300">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              ))}

              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-gray-200 dark:bg-gray-800 relative">
          <div
            className="h-full bg-blue-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isConfigured && (user ? (
                <>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
