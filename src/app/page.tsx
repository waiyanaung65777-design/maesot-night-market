'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryBar from '@/components/CategoryBar';
import FoodCard from '@/components/FoodCard';
import FoodModal from '@/components/FoodModal';
import IntroSplash from '@/components/IntroSplash';
import Footer from '@/components/Footer';
import { MOCK_FOODS, FoodItem, CATEGORIES } from '@/data/mockFoods';
import { Sparkles, SearchX } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentLang, setCurrentLang] = useState<'en' | 'mm' | 'th'>('mm');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Filter and sort items
  const filteredFoods = useMemo(() => {
    return MOCK_FOODS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        item.titleEn.toLowerCase().includes(query) ||
        item.titleMm.toLowerCase().includes(query) ||
        item.titleTh.toLowerCase().includes(query) ||
        item.stallName.toLowerCase().includes(query) ||
        item.stallNameMm.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const categoryTitle =
    currentLang === 'mm'
      ? activeCategoryObj?.nameMm
      : currentLang === 'th'
      ? activeCategoryObj?.nameTh
      : activeCategoryObj?.nameEn;

  return (
    <main className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      <IntroSplash isOpen={showIntro} onClose={() => setShowIntro(false)} />

      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
      />

      <HeroBanner currentLang={currentLang} />

      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currentLang={currentLang}
      />

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex-1 w-full">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col mb-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 flex items-center gap-2">
            <span>{categoryTitle}</span>
          </h3>
          <p className="text-sm text-zinc-400 mt-1 font-light">
            {currentLang === 'mm'
              ? `ဟင်းလျာ ${filteredFoods.length} မျိုး ရရှိနိုင်ပါသည်`
              : `${filteredFoods.length} items available`}
          </p>
        </div>

        {/* Bento Grid */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {filteredFoods.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                currentLang={currentLang}
                onClick={() => setSelectedFood(item)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-zinc-50 rounded-[2rem] my-8 animate-fade-in-up">
            <SearchX className="w-8 h-8 text-zinc-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-zinc-900">
              {currentLang === 'mm' ? 'ရှာမတွေ့ပါခင်ဗျာ' : 'Nothing found'}
            </h4>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 text-xs uppercase tracking-wider bg-zinc-900 text-white font-semibold rounded-full transition-transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <FoodModal
        item={selectedFood}
        currentLang={currentLang}
        onClose={() => setSelectedFood(null)}
      />

      {/* Floating Replay - Minimal */}
      <button
        onClick={() => setShowIntro(true)}
        className="fixed bottom-6 right-6 z-30 w-12 h-12 bg-white border border-zinc-200 text-zinc-900 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      <Footer currentLang={currentLang} />
    </main>
  );
}
