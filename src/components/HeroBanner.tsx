'use client';

import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface HeroBannerProps {
  currentLang: 'en' | 'mm' | 'th';
}

export default function HeroBanner({ currentLang }: HeroBannerProps) {
  return (
    <section className="px-4 lg:px-8 pt-10 pb-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <span className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-6 animate-fade-in-up">
          No Sign-in Required
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-6 animate-fade-in-up delay-100">
          {currentLang === 'mm' ? (
            <>မဲဆောက်ညဈေး<br/><span className="text-zinc-400">အရသာများ</span></>
          ) : currentLang === 'th' ? (
            <>รสชาติแท้ๆ จาก<br/><span className="text-zinc-400">ตลาดโต้รุ่งแม่สอด</span></>
          ) : (
            <>Authentic Flavors of<br/><span className="text-zinc-400">Mae Sot Market.</span></>
          )}
        </h2>

        <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200 font-light">
          {currentLang === 'mm'
            ? 'မဲဆောက်ညဈေးမှ နာမည်ကြီး အကင်၊ မာလာရှမ်းကောနှင့် ထိုင်းအစားအစာများကို လွတ်လပ်စွာ ဝင်ရောက်ကြည့်ရှုလိုက်ပါ။'
            : 'Curated street food, charcoal grills, and refreshing delicacies from the heart of the Asian Highway Night Bazaar.'}
        </p>

        {/* Minimal Info Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium animate-fade-in-up delay-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>Mae Sot, Tak</span>
          </div>
          <div className="w-1 h-1 bg-zinc-300 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>17:00 – 23:30 Daily</span>
          </div>
        </div>

      </div>
    </section>
  );
}
