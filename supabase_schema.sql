-- ========================================================
-- MAESOT NIGHT MARKET - SUPABASE DATABASE SCHEMA
-- ========================================================
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create Stalls Table (ဆိုင်ခန်းများ စာရင်း)
CREATE TABLE IF NOT EXISTS stalls (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_mm TEXT NOT NULL,
  stall_no TEXT NOT NULL,
  zone TEXT NOT NULL,
  phone TEXT,
  line_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Categories Table (အစားအသောက် အုပ်စုများ)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_mm TEXT NOT NULL,
  name_th TEXT NOT NULL,
  emoji TEXT NOT NULL
);

-- 3. Create Menu Items Table (အစားအသောက်များ စာရင်း)
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGSERIAL PRIMARY KEY,
  stall_id BIGINT REFERENCES stalls(id) ON DELETE CASCADE,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  title_en TEXT NOT NULL,
  title_mm TEXT NOT NULL,
  title_th TEXT NOT NULL,
  price_thb NUMERIC NOT NULL,
  price_mmk NUMERIC NOT NULL,
  emoji TEXT DEFAULT '🍜',
  tag TEXT DEFAULT 'Popular',
  spice_level TEXT DEFAULT 'None', -- None, Mild, Medium, Very Hot
  rating NUMERIC DEFAULT 4.8,
  reviews_count INT DEFAULT 0,
  desc_en TEXT,
  desc_mm TEXT,
  ingredients_en TEXT[],
  ingredients_mm TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE stalls ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policy (Everyone can read food list without sign-in)
CREATE POLICY "Public stalls can be viewed by everyone" ON stalls
  FOR SELECT USING (true);

CREATE POLICY "Public categories can be viewed by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public menu items can be viewed by everyone" ON menu_items
  FOR SELECT USING (true);

-- 6. Insert Initial Categories
INSERT INTO categories (id, name_en, name_mm, name_th, emoji) VALUES
  ('bbq', 'BBQ & Skewers', 'အကင်မျိုးစုံ', 'ปิ้งย่าง', '🍢'),
  ('mala', 'Mala & Spicy', 'မာလာရှမ်းကော', 'หมาล่า', '🌶️'),
  ('thai', 'Thai Favorites', 'ထိုင်းရိုးရာဟင်းလျာများ', 'อาหารไทย', '🍜'),
  ('myanmar', 'Myanmar Delights', 'မြန်မာ့အရသာ', 'อาหารพม่า', '🍲'),
  ('drinks', 'Drinks & Desserts', 'အချိုရည်နှင့် အအေး', 'เครื่องดื่มและของหวาน', '🧋')
ON CONFLICT (id) DO NOTHING;
