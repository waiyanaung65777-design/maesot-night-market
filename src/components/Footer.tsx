'use client';

import React from 'react';

interface FooterProps {
  currentLang: 'en' | 'mm' | 'th';
}

export default function Footer({ currentLang }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-zinc-100 bg-white px-4 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-xl font-medium tracking-tight text-zinc-900 mb-2">
          MaeSot Market
        </h2>
        
        <p className="text-zinc-400 text-sm font-light max-w-md mx-auto mb-10">
          {currentLang === 'mm'
            ? 'မဲဆောက်မြို့၏ အရသာအရှိဆုံး ညဈေးအစားအစာများကို အချိန်မရွေး လွယ်ကူလျင်မြန်စွာ ကြည့်ရှုနိုင်သော ဝက်ဘ်ဆိုက်။'
            : 'The official digital food catalog for Mae Sot Night Market stalls. Discover local delicacies effortlessly.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-zinc-400 tracking-wider uppercase font-semibold mb-12">
          <span>Everyday 17:00 – 23:30</span>
          <span className="hidden sm:inline">•</span>
          <span>Line: @maesotmarket</span>
        </div>

        <div className="text-[10px] text-zinc-300 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} MaeSot Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
