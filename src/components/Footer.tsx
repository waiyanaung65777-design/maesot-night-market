'use client';

import React from 'react';
import { MapPin, Clock, MessageSquare } from 'lucide-react';

interface FooterProps {
  currentLang: 'en' | 'mm' | 'th';
}

export default function Footer({ currentLang }: FooterProps) {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200 px-4 lg:px-8 py-10 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🍜</span>
            <span className="text-lg font-bold text-slate-900">MaeSot Market</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-xs">
            {currentLang === 'mm'
              ? 'မဲဆောက်မြို့၏ အရသာအရှိဆုံး ညဈေးအစားအစာများကို အချိန်မရွေး လွယ်ကူလျင်မြန်စွာ ကြည့်ရှုနိုင်သော ပြည်တွင်းအစားအသောက် စာရင်းဝက်ဘ်ဆိုက်။'
              : 'The official digital food catalog for Mae Sot Night Market stalls. Discover local delicacies, grilled skewers, and traditional meals.'}
          </p>
        </div>

        <div>
          <h5 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-xs">
            Location & Hours
          </h5>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Asian Highway Night Bazaar & Walking Street, Mae Sot, Tak</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Everyday 5:00 PM – 11:30 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-500 shrink-0" />
              <span>LINE: @maesotnightmarket</span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-xs">
            Delivery Platform
          </h5>
          <p className="leading-relaxed mb-4 text-xs text-slate-500">
            {currentLang === 'mm'
              ? 'အိမ်တိုင်ရာရောက် ပို့ဆောင်ပေးမည့် Food Delivery စနစ်ကို မကြာမီ Supabase နှင့် ချိတ်ဆက် ထည့်သွင်းပေးသွားမည် ဖြစ်ပါသည်။'
              : 'Instant door-to-door food delivery will be integrated in the next phase using Supabase and automated rider notifications.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-[10px] font-bold">
              Next.js 16
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-[10px] font-bold">
              Supabase Ready
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span>&copy; {new Date().getFullYear()} MaeSot Market. Designed for Mae Sot food lovers.</span>
        <span className="text-blue-500 font-bold">မဲဆောက် ညဈေး • ตลาดโต้รุ่งแม่สอด</span>
      </div>
    </footer>
  );
}
