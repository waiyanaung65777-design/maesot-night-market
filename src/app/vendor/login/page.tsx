'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Store, Chrome, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setMessage(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/vendor/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Google Login အဆင်မပြေပါ' });
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Successfully logged in
      window.location.href = '/vendor/dashboard';
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Email သို့မဟုတ် Password မှားယွင်းနေပါသည်' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* Back to Home */}
      <Link href="/" className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors">
        ← Back to Market
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 sm:p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-zinc-900/20">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Vendor Portal
          </h1>
          <p className="text-zinc-500 text-sm font-light">
            ဆိုင်ပိုင်ရှင်များ ဝင်ရောက်ရန်
          </p>
        </div>

        {/* Error/Success Message */}
        {message && (
          <div className={`p-4 rounded-xl text-sm mb-6 ${
            message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          }`}>
            {message.text}
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-medium py-3.5 rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        >
          <Chrome className="w-5 h-5 text-zinc-700" />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center mb-8">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="shrink-0 px-4 text-xs text-zinc-400 uppercase tracking-widest font-semibold">Or</span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@maesot.com"
                required
                className="w-full bg-zinc-50 border border-zinc-200/80 text-sm rounded-xl py-3 pl-11 pr-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-zinc-50 border border-zinc-200/80 text-sm rounded-xl py-3 px-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-zinc-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500 mt-8">
          အကောင့်မရှိသေးပါက <span className="text-zinc-900 font-semibold cursor-pointer underline underline-offset-2">Google ဖြင့် Sign in</span> လုပ်လိုက်ရုံဖြင့် အလိုအလျောက် အကောင့်ဖွင့်ပြီးသား ဖြစ်သွားပါမည်။
        </p>

      </div>
    </div>
  );
}
