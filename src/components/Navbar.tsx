'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentLang: 'en' | 'mm' | 'th';
  onLangChange: (lang: 'en' | 'mm' | 'th') => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  currentLang,
  onLangChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-4 lg:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Brand Logo - Minimalist */}
        <div className="flex flex-col cursor-pointer shrink-0">
          <h1 className="text-xl font-medium tracking-tight text-zinc-900 leading-none">
            MaeSot
          </h1>
          <p className="text-[10px] text-zinc-400 font-semibold tracking-widest mt-1 uppercase">
            Market
          </p>
        </div>

        {/* Minimal Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative group hidden sm:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              currentLang === 'mm'
                ? 'ဟင်းလျာများကို ရှာဖွေပါ...'
                : currentLang === 'th'
                ? 'ค้นหาอาหาร...'
                : 'Search the market...'
            }
            className="w-full bg-zinc-50 border border-zinc-200/80 text-sm rounded-full py-2.5 pl-11 pr-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all duration-300"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3 transition-colors group-focus-within:text-zinc-900" />
        </div>

        {/* Premium Language Toggles */}
        <div className="flex items-center gap-1 bg-zinc-50 rounded-full p-1 border border-zinc-200/50">
          {(['en', 'mm', 'th'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLangChange(lang)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                currentLang === lang
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50'
                  : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-4 sm:hidden relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full bg-zinc-50 border border-zinc-200/80 text-sm rounded-full py-2.5 pl-11 pr-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all"
        />
        <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3" />
      </div>
    </header>
  );
}
