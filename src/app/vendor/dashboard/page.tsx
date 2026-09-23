'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Store, Plus, Package, Settings, LogOut, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Simple modal for adding items
function AddItemModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">Add New Item</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Form */}
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-scale-up" />
            <h4 className="text-xl font-semibold text-zinc-900 mb-2">Item Added Successfully!</h4>
            <p className="text-sm text-zinc-500">The new item has been added to your menu.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Food Name (MM)</label>
                <input type="text" required placeholder="ဥပမာ - ကြေးအိုး" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Food Name (TH/EN)</label>
                <input type="text" placeholder="e.g. Tom Yum" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Price (Baht)</label>
                <input type="number" required placeholder="฿" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Category</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                  <option>BBQ & Skewers</option>
                  <option>Mala & Spicy</option>
                  <option>Thai Favorites</option>
                  <option>Drinks & Desserts</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Description</label>
              <textarea rows={3} placeholder="Brief description of the food..." className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"></textarea>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Item'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default function VendorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      
      {/* Modal */}
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 animate-fade-in-up delay-100">
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Active Items</h3>
            <p className="text-3xl font-semibold">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Store Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">Open / รับออเดอร์</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer">
            <div className="w-10 h-10 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Settings</h3>
            <span className="text-sm font-medium text-blue-600 hover:underline">
              Edit Store Profile &rarr;
            </span>
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Item</span>
          </button>
        </div>

      </main>
    </div>
  );
}
