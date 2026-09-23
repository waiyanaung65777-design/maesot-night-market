# MaeSot Night Market - Deployment & Setup Guide

လမ်းညွှန်ချက် - Vercel သို့ Deploy ပြုလုပ်ခြင်း နှင့် Namecheap Domain ချိတ်ဆက်ခြင်း

---

## ၁။ Local တွင် စမ်းသပ် Run ခြင်း (Running Locally)

Terminal သို့မဟုတ် PowerShell ဖွင့်ပြီး အောက်ပါ command ကို run ပါ-

```bash
cd "C:\Users\Wai Yan\.gemini\antigravity\scratch\maesot-night-market"
npm run dev
```

Browser တွင် `http://localhost:3000` သို့ ဝင်ရောက်ကြည့်ရှုနိုင်ပါသည်။

---

## ၂။ Vercel ပေါ်သို့ Deploy လုပ်ခြင်း (Deploying to Vercel)

### နည်းလမ်း (A) - GitHub မှတစ်ဆင့် Deploy လုပ်ခြင်း (အကောင်းဆုံးနှင့် အလွယ်ဆုံးနည်းလမ်း)

1. [GitHub.com](https://github.com) တွင် Repository အသစ်တစ်ခု ဆောက်ပါ (ဥပမာ- `maesot-night-market`)။
2. Project folder ထဲတွင် git push ပြုလုပ်ပါ-
   ```bash
   git add .
   git commit -m "feat: MaeSot night market public food catalog"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/maesot-night-market.git
   git push -u origin main
   ```
3. [Vercel.com](https://vercel.com) သို့ သွားရောက်ပြီး သင်၏ GitHub အကောင့်ဖြင့် Sign in ဝင်ပါ။
4. **"Add New"** > **"Project"** ကို နှိပ်ပြီး သင်၏ `maesot-night-market` repo ကို Import လုပ်ပါ။
5. **Deploy** ကို နှိပ်လိုက်သည်နှင့် ၁ မိနစ်အတွင်း live URL တစ်ခု ရရှိပါမည်။

---

## ၃။ Namecheap Custom Domain ချိတ်ဆက်နည်း (Connecting Namecheap Domain)

ဥပမာ သင်သည် Namecheap တွင် `maesotnightmarket.com` ကို ဝယ်ထားပါက-

### အဆင့် ၁ - Vercel တွင် Domain ထည့်သွင်းခြင်း
1. Vercel Dashboard > သင်၏ Project > **Settings** > **Domains** သို့ သွားပါ။
2. သင်၏ domain နာမည် (ဥပမာ- `maesotnightmarket.com` နှင့် `www.maesotnightmarket.com`) ကို ရိုက်ထည့်ပြီး **Add** နှိပ်ပါ။
3. Vercel က ပြသပေးမည့် DNS records များကို မှတ်ထားပါ-
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`

### အဆင့် ၂ - Namecheap DNS ပြင်ဆင်ခြင်း
1. [Namecheap.com](https://www.namecheap.com) တွင် Dashboard > **Domain List** သို့ သွားပါ။
2. သင်၏ domain ဘေးရှိ **Manage** ကို နှိပ်ပါ။
3. **Advanced DNS** tab သို့ ဝင်ပါ။
4. **Host Records** အောက်တွင် အောက်ပါအတိုင်း ထည့်ပါ-
   - **Type:** `A Record` | **Host:** `@` | **Value:** `76.76.21.21` | **TTL:** `Automatic`
   - **Type:** `CNAME Record` | **Host:** `www` | **Value:** `cname.vercel-dns.com` | **TTL:** `Automatic`
5. **Save all changes** ကို နှိပ်ပါ။

*(၅ မိနစ်မှ နာရီဝက်အတွင်း SSL Certificate ပါဝင်ပြီး သင့် Domain ဖြင့် ချက်ချင်း အသုံးပြုနိုင်ပါပြီ)*

---

## ၄။ Supabase Backend ချိတ်ဆက်နည်း (Connecting Supabase)

1. [Supabase.com](https://supabase.com) တွင် Project အသစ်တစ်ခု အခမဲ့ ဖန်တီးပါ။
2. **SQL Editor** သို့ သွားပြီး `supabase_schema.sql` ထဲရှိ code များကို paste လုပ်ကာ **Run** နှိပ်ပါ။
3. **Project Settings** > **API** မှ `Project URL` နှင့် `anon / public key` ကို ကူးယူပါ။
4. Vercel Project Settings > **Environment Variables** တွင် ထည့်သွင်းပေးပါ-
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
