export interface FoodItem {
  id: number;
  titleEn: string;
  titleMm: string;
  titleTh: string;
  category: 'bbq' | 'mala' | 'thai' | 'myanmar' | 'drinks';
  priceThb: number;
  priceMmk: number;
  stallName: string;
  stallNameMm: string;
  stallNo: string;
  emoji: string;
  tag: string;
  spice: 'None' | 'Mild' | 'Medium' | 'Very Hot';
  rating: number;
  reviewsCount: number;
  descEn: string;
  descMm: string;
  ingredientsEn: string[];
  ingredientsMm: string[];
}

export interface Category {
  id: string;
  nameEn: string;
  nameMm: string;
  nameTh: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', nameEn: 'All Foods', nameMm: 'အားလုံး', nameTh: 'ทั้งหมด', emoji: '🔥' },
  { id: 'bbq', nameEn: 'BBQ & Skewers', nameMm: 'အကင်မျိုးစုံ', nameTh: 'ปิ้งย่าง', emoji: '🍢' },
  { id: 'mala', nameEn: 'Mala & Spicy', nameMm: 'မာလာရှမ်းကော', nameTh: 'หมาล่า', emoji: '🌶️' },
  { id: 'thai', nameEn: 'Thai Favorites', nameMm: 'ထိုင်းရိုးရာဟင်းလျာများ', nameTh: 'อาหารไทย', emoji: '🍜' },
  { id: 'myanmar', nameEn: 'Myanmar Delights', nameMm: 'မြန်မာ့အရသာ', nameTh: 'อาหารพม่า', emoji: '🍲' },
  { id: 'drinks', nameEn: 'Drinks & Desserts', nameMm: 'အချိုရည်နှင့် အအေး', nameTh: 'เครื่องดื่มและของหวาน', emoji: '🧋' },
];

export const MOCK_FOODS: FoodItem[] = [];
