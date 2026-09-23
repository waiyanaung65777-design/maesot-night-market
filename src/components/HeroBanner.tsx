'use client';

import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface HeroBannerProps {
  currentLang: 'en' | 'mm' | 'th';
}

export default function HeroBanner({ currentLang }: HeroBannerProps) {
  return (
    <section className="relative px-4 lg:px-8 pt-16 pb-10 bg-white overflow-hidden">
      
      {/* --- Moving Color Mesh Gradient Background --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      {/* --------------------------------------------- */}

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-6 animate-fade-in-up drop-shadow-sm">
          {currentLang === 'mm' ? (
            <>မဲဆောက်ညဈေး<br/><span className="text-zinc-400">အရသာများ</span></>
          ) : currentLang === 'th' ? (
            <>รสชาติแท้ๆ จาก<br/><span className="text-zinc-400">ตลาดโต้รุ่งแม่สอด</span></>
          ) : (
            <>Authentic Flavors of<br/><span className="text-zinc-400">Mae Sot Market.</span></>
          )}
        </h2>

        <p className="text-zinc-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-100 font-medium">
          {currentLang === 'mm'
            ? 'မဲဆောက်ညဈေးမှ နာမည်ကြီး အကင်၊ မာလာရှမ်းကောနှင့် ထိုင်းအစားအစာများကို လွတ်လပ်စွာ ဝင်ရောက်ကြည့်ရှုလိုက်ပါ။'
            : 'Curated street food, charcoal grills, and refreshing delicacies from the heart of the Asian Highway Night Bazaar.'}
        </p>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in-up delay-200">
          <Link 
            href="/vendor/login" 
            className="px-8 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-zinc-900/20"
          >
            {currentLang === 'mm' ? 'အကောင့်ဝင်ရန် (Sign In)' : 'Sign In'}
          </Link>
          <Link 
            href="/vendor/login" 
            className="px-8 py-3 bg-white text-zinc-900 border border-zinc-200 text-sm font-semibold rounded-full transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-95 shadow-sm"
          >
            {currentLang === 'mm' ? 'အကောင့်ဖွင့်ရန် (Sign Up)' : 'Sign Up'}
          </Link>
        </div>

        {/* Minimal Info Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-semibold animate-fade-in-up delay-300 bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Mae Sot, Tak</span>
          </div>
          <div className="w-1 h-1 bg-zinc-300 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>17:00 – 23:30 Daily</span>
          </div>
        </div>

      </div>
    </section>
  );
}
