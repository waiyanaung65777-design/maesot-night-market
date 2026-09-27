'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Store, Plus, Package, Settings, LogOut, X, CheckCircle2, UploadCloud, Trash2, Edit3, AlertCircle } from 'lucide-react';

// Modal for Adding / Editing Items
function ManageItemModal({ isOpen, onClose, editingItem, onRefresh }: { isOpen: boolean; onClose: () => void; editingItem?: any; onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_mm: '',
    name_en: '',
    price: '',
    category: 'BBQ & Skewers',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          name_mm: editingItem.name_mm || '',
          name_en: editingItem.name_en || '',
          price: editingItem.price?.toString() || '',
          category: editingItem.category || 'BBQ & Skewers',
          description: editingItem.description || ''
        });
        setImagePreview(editingItem.image_url || null);
      } else {
        setFormData({ name_mm: '', name_en: '', price: '', category: 'BBQ & Skewers', description: '' });
        setImagePreview(null);
      }
      setSuccess(false);
    }
  }, [isOpen, editingItem]);

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

      const itemPayload = {
        vendor_id: userData.user.id,
        name_mm: formData.name_mm,
        name_en: formData.name_en,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        image_url: imagePreview,
        is_available: true
      };

      let error;
      if (editingItem) {
        const { error: updateError } = await supabase.from('menu_items').update(itemPayload).eq('id', editingItem.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('menu_items').insert([itemPayload]);
        error = insertError;
      }

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onRefresh();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error saving item:", error);
      alert(`Failed to save item. Error: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative animate-scale-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200/50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          <button type="button" onClick={onClose} className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-scale-up" />
            <h4 className="text-xl font-semibold text-zinc-900 mb-2">Success!</h4>
            <p className="text-sm text-zinc-500">Item has been {editingItem ? 'updated' : 'added'} to your menu.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Food Photo</label>
              <div className="relative w-full h-40 border-2 border-dashed border-zinc-300 rounded-2xl bg-white/50 flex flex-col items-center justify-center overflow-hidden hover:bg-zinc-50 transition-colors cursor-pointer group">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-400 group-hover:text-zinc-600 transition-colors pointer-events-none">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Click or drag photo here</span>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name (MM)</label>
                <input type="text" required value={formData.name_mm} onChange={e => setFormData({...formData, name_mm: e.target.value})} placeholder="ဥပမာ - ကြေးအိုး" className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name (EN/TH)</label>
                <input type="text" value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} placeholder="e.g. Tom Yum" className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Price (Baht)</label>
                <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="฿" className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
                  <option>BBQ & Skewers</option>
                  <option>Mala & Spicy</option>
                  <option>Thai Favorites</option>
                  <option>Drinks & Desserts</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Brief description..." className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none transition-all"></textarea>
            </div>
            <div className="pt-4 border-t border-zinc-200/50 flex justify-end gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-200/50 rounded-xl transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20 transition-all disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Item'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Modal for Editing Store Profile
function EditStoreModal({ isOpen, onClose, initialData, onRefresh }: { isOpen: boolean; onClose: () => void; initialData?: any; onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeZone, setStoreZone] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStoreName(initialData?.store_name || '');
      setStoreZone(initialData?.store_zone || '');
      setImagePreview(initialData?.store_image_url || null);
      setSuccess(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // ... (image change logic omitted for brevity, reusing same as before)
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

      const profile = {
        id: userData.user.id,
        store_name: storeName,
        store_zone: storeZone,
        store_image_url: imagePreview,
        is_open: true
      };

      const { error } = await supabase.from('vendors').upsert([profile]);
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onRefresh();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      alert(`Failed to save profile. Error: ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your entire store profile? This will permanently delete all your menu items as well.")) {
      setLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { error } = await supabase.from('vendors').delete().eq('id', userData.user.id);
          if (error) throw error;
          
          onRefresh();
          onClose();
        }
      } catch (err: any) {
        console.error(err);
        alert(`Failed to delete profile. Error: ${err?.message || JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative animate-scale-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200/50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">Store Settings</h3>
          <button type="button" onClick={onClose} className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-scale-up" />
            <h4 className="text-xl font-semibold text-zinc-900 mb-2">Profile Updated!</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Store Photo / Logo</label>
              <div className="relative w-full h-40 border-2 border-dashed border-zinc-300 rounded-2xl bg-white/50 flex flex-col items-center justify-center overflow-hidden hover:bg-zinc-50 transition-colors cursor-pointer group">
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
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Store Name</label>
              <input type="text" required value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. Mae Sot BBQ Master" className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Store Description / Zone</label>
              <input type="text" value={storeZone} onChange={(e) => setStoreZone(e.target.value)} placeholder="e.g. Zone A, Stall #04" className="w-full bg-white/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
            </div>
            <div className="pt-6 border-t border-zinc-200/50 flex justify-between items-center sticky bottom-0 bg-white/80 backdrop-blur-md">
              <button type="button" onClick={handleDeleteProfile} className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline px-2 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Delete Profile
              </button>
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-200/50 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="px-8 py-3 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
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
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();

  const fetchData = async (userId: string) => {
    const { data: vendorData, error: vendorError } = await supabase.from('vendors').select('*').eq('id', userId).maybeSingle();
    if (vendorError) console.error("Vendor fetch error:", vendorError);
    setStoreInfo(vendorData || null);

    const { data: itemsData, error: itemsError } = await supabase.from('menu_items').select('*').eq('vendor_id', userId).order('created_at', { ascending: false });
    if (itemsError) console.error("Items fetch error:", itemsError);
    setMenuItems(itemsData || []);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/vendor/login');
      } else {
        setUser(session.user);
        await fetchData(session.user.id);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/vendor/login');
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await supabase.from('menu_items').delete().eq('id', id);
      if (user) fetchData(user.id);
    }
  };

  const handleToggleStoreOpen = async () => {
    if (!storeInfo || !user) return;
    const newStatus = !storeInfo.is_open;
    const { error } = await supabase.from('vendors').update({ is_open: newStatus }).eq('id', user.id);
    if (!error) setStoreInfo({ ...storeInfo, is_open: newStatus });
  };

  const handleToggleItemAvailable = async (item: any) => {
    const newStatus = !item.is_available;
    const { error } = await supabase.from('menu_items').update({ is_available: newStatus }).eq('id', item.id);
    if (!error) {
      setMenuItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_available: newStatus } : i));
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 relative overflow-hidden text-zinc-900 font-sans selection:bg-amber-200 selection:text-zinc-900 z-0">
      
      {/* Background Ambient Mesh */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-amber-400/20 to-orange-500/10 blur-[120px] -z-10 animate-pulse mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-rose-400/20 to-amber-300/10 blur-[100px] -z-10 mix-blend-multiply"></div>

      {/* Modals */}
      <ManageItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingItem={editingItem}
        onRefresh={() => user && fetchData(user.id)}
      />
      <EditStoreModal 
        isOpen={isStoreModalOpen} 
        onClose={() => setIsStoreModalOpen(false)} 
        initialData={storeInfo} 
        onRefresh={() => user && fetchData(user.id)}
      />

      {/* Dashboard Top Nav */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 sticky top-0 z-30 shadow-sm shadow-zinc-100/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/20">
              {storeInfo?.store_image_url ? (
                <img src={storeInfo.store_image_url} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Store className="w-5 h-5" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none text-zinc-800">
                {storeInfo?.store_name || 'Vendor Portal'}
              </h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">MaeSot Market</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-zinc-600 hidden sm:inline-block bg-white/50 px-3 py-1.5 rounded-full border border-white">
              {user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="p-2.5 bg-white/50 border border-white hover:bg-white text-zinc-400 hover:text-red-500 rounded-full transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 pb-24">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">Overview</h2>
            <p className="text-zinc-500 text-sm mt-1 font-medium">Manage your store menu and settings</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-zinc-900/20 border border-zinc-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 animate-fade-in-up delay-100">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/40 transition-transform hover:-translate-y-1 hover:bg-white cursor-default group">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Active Items</h3>
            <p className="text-4xl font-extrabold text-zinc-800">{menuItems.length}</p>
          </div>
          
          <div 
            onClick={storeInfo ? handleToggleStoreOpen : undefined}
            className={`bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/40 transition-all hover:-translate-y-1 hover:bg-white group flex flex-col ${storeInfo ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${storeInfo?.is_open !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Store Status</h3>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full shadow-sm ${storeInfo?.is_open !== false ? 'bg-emerald-500 shadow-emerald-500/50 animate-pulse' : 'bg-red-400 shadow-red-400/50'}`}></div>
                <p className={`text-sm font-bold ${storeInfo?.is_open !== false ? 'text-emerald-700' : 'text-red-600'}`}>
                  {storeInfo?.is_open !== false ? 'Open / ဖွင့်သည်' : 'Closed / ပိတ်သည်'}
                </p>
              </div>
              {storeInfo && (
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${storeInfo.is_open !== false ? 'bg-emerald-500' : 'bg-zinc-300'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${storeInfo.is_open !== false ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              )}
            </div>
            {storeInfo && (
              <p className="text-[10px] text-zinc-400 font-medium mt-3">
                {storeInfo.is_open !== false ? 'Tap to close store' : 'Tap to open store'}
              </p>
            )}
          </div>

          <div 
            onClick={() => setIsStoreModalOpen(true)}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/40 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer group flex flex-col"
          >
            <div className="w-12 h-12 bg-zinc-100 text-zinc-600 rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-45 transition-transform duration-300">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Settings</h3>
            <div className="mt-auto flex items-center justify-between text-amber-600">
              <span className="text-sm font-bold">Edit Profile</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        {!storeInfo ? (
          <div className="bg-amber-50/80 backdrop-blur-md rounded-[2.5rem] border border-amber-200/50 p-12 text-center animate-fade-in-up delay-200 shadow-xl shadow-amber-500/5">
            <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Welcome to Vendor Portal</h3>
            <p className="text-amber-700/80 text-sm max-w-md mx-auto mb-8 font-medium">
              ကျေးဇူးပြု၍ "Edit Store Profile" သို့ဝင်ရောက်ပြီး သင့်ဆိုင်၏ အချက်အလက်များကို အရင်ဆုံး ဖြည့်စွက်ပေးပါ။
            </p>
            <button 
              onClick={() => setIsStoreModalOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/30 hover:scale-105"
            >
              <Settings className="w-4 h-4" />
              <span>Setup Store Profile</span>
            </button>
          </div>
        ) : menuItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up delay-200">
            {menuItems.map((item) => (
              <div key={item.id} className={`bg-white/80 backdrop-blur-lg rounded-3xl border overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col ${item.is_available ? 'border-white/60 shadow-zinc-200/30 hover:shadow-amber-500/10' : 'border-red-200/50 shadow-red-100/30 opacity-75'}`}>
                <div className="relative h-48 bg-zinc-100 overflow-hidden shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name_mm} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 bg-zinc-50">No Image</div>
                  )}
                  {/* Out of Stock overlay */}
                  {!item.is_available && (
                    <div className="absolute inset-0 bg-zinc-900/60 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white font-black text-sm uppercase tracking-widest bg-red-500 px-3 py-1.5 rounded-full shadow-lg">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-zinc-900 shadow-lg border border-white/50">
                    ฿{item.price}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-zinc-900 truncate mb-1">{item.name_mm}</h3>
                  {item.name_en && <p className="text-xs font-medium text-zinc-500 truncate mb-3">{item.name_en}</p>}
                  
                  {/* Out of Stock Toggle */}
                  <button
                    onClick={() => handleToggleItemAvailable(item)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold transition-all mb-3 ${item.is_available ? 'bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-600' : 'bg-red-50 text-red-600 hover:bg-emerald-50 hover:text-emerald-700'}`}
                  >
                    <div className={`relative inline-flex h-5 w-9 items-center rounded-full flex-shrink-0 transition-colors duration-300 ${item.is_available ? 'bg-emerald-500' : 'bg-zinc-300'}`}>
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${item.is_available ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                    <span>{item.is_available ? 'In Stock / ရှိသည်' : 'Out of Stock / ကုန်ပြီ'}</span>
                  </button>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md">
                      {item.category || 'Food'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-12 text-center animate-fade-in-up delay-200 shadow-xl shadow-zinc-200/40">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Package className="w-10 h-10 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">No items yet</h3>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 font-medium leading-relaxed">
              ဟင်းလျာများ မတင်ရသေးပါ။ သင့်ဆိုင်၏ Menu များကို စတင်ထည့်သွင်းပြီး Customer များထံ ရောင်းချလိုက်ပါ။
            </p>
            <button 
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create First Item</span>
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
