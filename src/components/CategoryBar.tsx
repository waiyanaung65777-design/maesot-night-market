'use client';

import React from 'react';
import { CATEGORIES } from '@/data/mockFoods';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  currentLang: 'en' | 'mm' | 'th';
}

export default function CategoryBar({
  activeCategory,
  onSelectCategory,
  currentLang,
}: CategoryBarProps) {
  return (
    <section className="bg-white/90 backdrop-blur-md sticky top-[73px] z-30 border-b border-zinc-100 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          const label =
            currentLang === 'mm'
              ? cat.nameMm
              : currentLang === 'th'
              ? cat.nameTh
              : cat.nameEn;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <span className={isActive ? 'opacity-100' : 'opacity-70 grayscale'}>{cat.emoji}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
