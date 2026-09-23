'use client';

import React from 'react';
import { Clock, Utensils, Bike } from 'lucide-react';

interface HeroBannerProps {
  currentLang: 'en' | 'mm' | 'th';
}

export default function HeroBanner({ currentLang }: HeroBannerProps) {
  return (
    <section className="px-4 lg:px-8 pt-4 pb-2 bg-slate-50">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 md:p-8 relative overflow-hidden shadow-lg shadow-blue-500/20">
        
        {/* Soft abstract shapes */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-10 bottom-0 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>

        <div className="relative z-10 max-w-2xl text-white">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold tracking-wider mb-4">
            🔥 NO SIGN-IN REQUIRED
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            {currentLang === 'mm' ? 'မဲဆောက်ညဈေး အစားအသောက်များ' : 'Delicious Mae Sot Street Food'}
          </h2>

          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
            {currentLang === 'mm'
              ? 'အကောင့်ဖွင့်စရာမလိုဘဲ မဲဆောက်ညဈေးမှ နာမည်ကြီး အကင်၊ မာလာရှမ်းကောနှင့် ထိုင်းအစားအစာများကို လွတ်လပ်စွာ ကြည့်ရှုလိုက်ပါ။'
              : 'Explore the best charcoal grills, spicy mala skewers, and refreshing drinks from Mae Sot Night Market.'}
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Utensils className="w-3.5 h-3.5" />
              <span>45+ Stalls</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5" />
              <span>5:00 PM – 11:30 PM</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-yellow-100">
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
