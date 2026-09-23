'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Store, Plus, Package, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function VendorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/vendor/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/vendor/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* Dashboard Top Nav */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight leading-none">Vendor Portal</h1>
              <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-1">MaeSot Market</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-500 hidden sm:inline-block">
              {user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
            <p className="text-zinc-500 text-sm mt-1">ဆိုင်၏ အရောင်းစာရင်းနှင့် ဟင်းလျာများကို စီမံပါ</p>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20">
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 animate-fade-in-up delay-100">
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Active Items</h3>
            <p className="text-3xl font-semibold">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Store Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">Open / รับออเดอร์</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Settings</h3>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Edit Store Profile &rarr;
            </Link>
          </div>
        </div>

        {/* Empty State for Items */}
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-12 text-center animate-fade-in-up delay-200">
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-zinc-300" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">No items yet</h3>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8">
            ဟင်းလျာများ မတင်ရသေးပါ။ သင့်ဆိုင်၏ Menu များကို စတင်ထည့်သွင်းပြီး Customer များထံ ရောင်းချလိုက်ပါ။
          </p>
          <button className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create First Item</span>
          </button>
        </div>

      </main>
    </div>
  );
}
