'use client';

import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentLang: 'en' | 'mm' | 'th';
  onLangChange: (lang: 'en' | 'mm' | 'th') => void;
  onReplayIntro: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  currentLang,
  onLangChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 lg:px-8 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-xl text-white shadow-sm group-hover:bg-blue-600 transition">
            🍜
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              MaeSot Market
            </h1>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" />
              မဲဆောက် ညဈေး
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              currentLang === 'mm'
                ? 'ဟင်းလျာ၊ အကင် ရှာဖွေရန်...'
                : currentLang === 'th'
                ? 'ค้นหาอาหาร...'
                : 'Search food or stall...'
            }
            className="w-full bg-slate-100 border-none text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Action Controls: Language */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-semibold">
          <button
            onClick={() => onLangChange('en')}
            className={`px-2.5 py-1.5 rounded-md transition ${
              currentLang === 'en'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLangChange('mm')}
            className={`px-2.5 py-1.5 rounded-md transition ${
              currentLang === 'mm'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            မြန်မာ
          </button>
          <button
            onClick={() => onLangChange('th')}
            className={`px-2.5 py-1.5 rounded-md transition ${
              currentLang === 'th'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            ไทย
          </button>
        </div>
      </div>
    </header>
  );
}
