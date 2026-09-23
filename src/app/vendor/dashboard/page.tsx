'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Store, Plus, Package, Settings, LogOut, X, CheckCircle2, UploadCloud, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

// Simple modal for adding items
function AddItemModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // Client-side compression using Canvas
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Reduce width to 800px max
          
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            const scaleSize = MAX_WIDTH / img.width;
            width = MAX_WIDTH;
            height = img.height * scaleSize;
          }

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 70% quality (0.7) to save space
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImagePreview(compressedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not logged in");

      const target = e.target as any;
      const newItem = {
        vendor_id: userData.user.id,
        name_mm: target[1].value, // 0 is image input, 1 is name_mm
        name_en: target[2].value,
        price: parseFloat(target[3].value),
        category: target[4].value,
        description: target[5].value,
        image_url: imagePreview,
        is_available: true
      };

      const { error } = await supabase.from('menu_items').insert([newItem]);
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setImagePreview(null);
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Error adding item:", error);
      alert(`Failed to save item. Error: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">Add New Item</h3>
          <button type="button" onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Food Photo</label>
              <div className="relative w-full h-40 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50 flex flex-col items-center justify-center overflow-hidden hover:bg-zinc-100 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                />
                
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-400 group-hover:text-zinc-600 transition-colors pointer-events-none">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Click or drag photo here</span>
                    <span className="text-xs mt-1 opacity-70">JPG, PNG up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

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

            <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 disabled:opacity-50">
                {loading ? 'Uploading...' : 'Save Item'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

// Modal for Editing Store Profile
function EditStoreModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            const scaleSize = MAX_WIDTH / img.width;
            width = MAX_WIDTH;
            height = img.height * scaleSize;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          setImagePreview(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not logged in");

      const target = e.target as any;
      const profile = {
        id: userData.user.id,
        store_name: target[1].value, // 0 is image input
        store_zone: target[2].value,
        store_image_url: imagePreview,
        is_open: true
      };

      const { error } = await supabase.from('vendors').upsert([profile]);
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setImagePreview(null);
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      alert(`Failed to save profile. Error: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">Edit Store Profile</h3>
          <button type="button" onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-scale-up" />
            <h4 className="text-xl font-semibold text-zinc-900 mb-2">Profile Updated!</h4>
            <p className="text-sm text-zinc-500">Your store information has been saved successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Store Photo / Logo</label>
              <div className="relative w-full h-40 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50 flex flex-col items-center justify-center overflow-hidden hover:bg-zinc-100 transition-colors cursor-pointer group">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-400 group-hover:text-zinc-600 transition-colors pointer-events-none">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Click or drag store photo</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Store Name</label>
              <input type="text" required placeholder="e.g. Mae Sot BBQ Master" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Store Description / Zone</label>
              <input type="text" placeholder="e.g. Zone A, Stall #04" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            </div>
            <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Profile'}
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
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
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
      
      {/* Modals */}
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditStoreModal isOpen={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} />

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
            <span 
              onClick={() => setIsStoreModalOpen(true)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
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
