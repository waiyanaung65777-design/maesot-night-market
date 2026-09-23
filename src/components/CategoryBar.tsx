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
    <section className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
