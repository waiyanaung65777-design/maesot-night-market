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
import { Sparkles, SearchX, ArrowUpDown } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentLang, setCurrentLang] = useState<'en' | 'mm' | 'th'>('mm');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Filter and sort items
  const filteredFoods = useMemo(() => {
    let result = MOCK_FOODS.filter((item) => {
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

    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => a.priceThb - b.priceThb);
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => b.priceThb - a.priceThb);
    } else if (sortOption === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else {
      result = [...result].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [activeCategory, searchQuery, sortOption]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const categoryTitle =
    currentLang === 'mm'
      ? activeCategoryObj?.nameMm
      : currentLang === 'th'
      ? activeCategoryObj?.nameTh
      : activeCategoryObj?.nameEn;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative">
      {/* 2-Second Cinematic Intro Animation Overlay */}
      <IntroSplash isOpen={showIntro} onClose={() => setShowIntro(false)} />

      {/* Main Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Hero Welcome Banner */}
      <HeroBanner currentLang={currentLang} />

      {/* Category Pills Bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currentLang={currentLang}
      />

      {/* Food Items Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 w-full">
        {/* Section Header: Title, Count, and Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>{activeCategoryObj?.emoji}</span>
              <span>{categoryTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {currentLang === 'mm'
                ? `ယနေ့ည ဖွင့်လှစ်ထားသော ဟင်းလျာ ${filteredFoods.length} မျိုး`
                : `Showing ${filteredFoods.length} street foods available tonight`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-500" />
              <span>Sort:</span>
            </span>
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as 'popular' | 'price-low' | 'price-high' | 'rating')
              }
              className="bg-white border border-slate-200 text-xs text-slate-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="popular">
                {currentLang === 'mm' ? 'လူကြိုက်များဆုံး (Popular)' : 'Most Popular'}
              </option>
              <option value="price-low">
                {currentLang === 'mm' ? 'စျေးနှုန်း: အနည်းမှ အများ' : 'Price: Low to High'}
              </option>
              <option value="price-high">
                {currentLang === 'mm' ? 'စျေးနှုန်း: အများမှ အနည်း' : 'Price: High to Low'}
              </option>
              <option value="rating">
                {currentLang === 'mm' ? 'အဆင့်အမြင့်ဆုံး (Top Rated)' : 'Top Rated'}
              </option>
            </select>
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          /* Empty Search Results */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 my-8 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
              <SearchX className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {currentLang === 'mm' ? 'ဟင်းလျာ ရှာမတွေ့ပါခင်ဗျာ' : 'No street foods found'}
            </h4>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {currentLang === 'mm'
                ? 'ရှာဖွေလိုသော စာလုံးကို ပြန်လည်စစ်ဆေးပါ သို့မဟုတ် Category အားလုံးကို ပြန်ရွေးကြည့်ပါ။'
                : 'Try adjusting your search terms or view all categories.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-sm cursor-pointer"
            >
              {currentLang === 'mm' ? 'အားလုံးပြန်ကြည့်မည် (Reset Filters)' : 'Reset Filters'}
            </button>
          </div>
        )}
      </section>

      {/* Food Details Modal */}
      <FoodModal
        item={selectedFood}
        currentLang={currentLang}
        onClose={() => setSelectedFood(null)}
      />

      {/* Floating Replay Animation Trigger */}
      <button
        onClick={() => setShowIntro(true)}
        className="fixed bottom-6 right-6 z-30 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-4 py-3 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform hover:scale-105 cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">Watch Intro</span>
      </button>

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </main>
  );
}
