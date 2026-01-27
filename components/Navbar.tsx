'use client';

import { useState } from 'react';
import { Menu, X, Sparkles, Heart, Bookmark, Home, Library } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  likedCount: number;
  bookmarkedCount: number;
}

export default function Navbar({ likedCount, bookmarkedCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-3 border-[rgb(30,30,40)] sticky top-0 z-50 shadow-soft">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg border-2 border-[rgb(30,30,40)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Quote<span className="text-primary">Verse</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/saved"
              className="flex items-center gap-2 px-4 py-2 font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Library className="w-4 h-4" />
              My Collection
            </Link>
            
            <div className="flex items-center gap-2 ml-2">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-primary-light border-2 border-[rgb(30,30,40)] rounded-full">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">{likedCount}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-secondary-light border-2 border-[rgb(30,30,40)] rounded-full">
                <Bookmark className="w-4 h-4 text-foreground" />
                <span className="text-sm font-bold">{bookmarkedCount}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 border-2 border-[rgb(30,30,40)] rounded-lg hover:shadow-soft-sm transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t-2 border-[rgb(30,30,40)] pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-3 font-semibold bg-background hover:bg-gray-100 rounded-lg border-2 border-[rgb(30,30,40)] transition-all min-h-[48px]"
                onClick={() => setMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/saved"
                className="flex items-center gap-2 px-4 py-3 font-semibold bg-background hover:bg-gray-100 rounded-lg border-2 border-[rgb(30,30,40)] transition-all min-h-[48px]"
                onClick={() => setMenuOpen(false)}
              >
                <Library className="w-4 h-4" />
                My Collection
              </Link>
              
              <div className="flex gap-2 mt-2">
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-primary-light border-2 border-[rgb(30,30,40)] rounded-lg min-h-[48px]">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold">{likedCount} Liked</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-secondary-light border-2 border-[rgb(30,30,40)] rounded-lg min-h-[48px]">
                  <Bookmark className="w-4 h-4 text-foreground" />
                  <span className="text-sm font-bold">{bookmarkedCount} Saved</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
