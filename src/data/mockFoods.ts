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

export const MOCK_FOODS: FoodItem[] = [
  {
    id: 1,
    titleEn: 'Moo Ping (Thai Grilled Pork Skewers)',
    titleMm: 'ထိုင်းစတိုင် ဝက်သားကင် (မူပင်း)',
    titleTh: 'หมูปิ้งนมสด',
    category: 'bbq',
    priceThb: 15,
    priceMmk: 1800,
    stallName: "Mae Sot BBQ Master",
    stallNameMm: "မဲဆောက်အကင်ဘုရင်",
    stallNo: "Zone A, Stall #04",
    emoji: "🍢",
    tag: "Best Seller 🔥",
    spice: "Mild",
    rating: 4.9,
    reviewsCount: 142,
    descEn: "Charcoal-grilled marinated pork skewers glazed with sweet coconut condensed milk marinade, served with warm sticky rice.",
    descMm: "မီးသွေးနံ့မွှေးမွှေးဖြင့် ကင်ထားသော ဝက်သားကင်နှင့် ကောက်ညှင်းပေါင်း။ ကလေးလူကြီး အားလုံးကြိုက်နှစ်သက်သော နာမည်ကြီး အကင်။",
    ingredientsEn: ["Pork loin", "Coconut milk", "Palm sugar", "Garlic & coriander root"],
    ingredientsMm: ["ဝက်သား", "အုန်းနို့", "ကြက်သွန်ဖြူ", "နံနံပင်မြစ်"]
  },
  {
    id: 2,
    titleEn: 'Mala Xiang Guo (Dry Pot Stir-Fry)',
    titleMm: 'မာလာရှမ်းကော အစပ်ကြော်',
    titleTh: 'หมาล่าผัดแห้งกระทะร้อน',
    category: 'mala',
    priceThb: 120,
    priceMmk: 14400,
    stallName: "Sichuan & Shan Taste",
    stallNameMm: "ရှမ်းမာလာဆိုင်",
    stallNo: "Zone B, Stall #12",
    emoji: "🌶️",
    tag: "Super Spicy 💥",
    spice: "Very Hot",
    rating: 4.8,
    reviewsCount: 98,
    descEn: "Fiery Sichuan peppercorn dry pot with your choice of beef, Taiwanese sausages, lotus root, enoki, and potato slices.",
    descMm: "လျှာထုံစပ် မာလာအမွှေးအကြိုင်စစ်စစ်ဖြင့် အမဲသား၊ ဝက်အူချောင်း၊ ကြာစွယ်၊ အပ်မှိုတို့ကို အပူရှိန်ပြင်းပြင်းဖြင့် မွှေကြော်ထားပါသည်။",
    ingredientsEn: ["Sichuan peppercorn", "Enoki mushroom", "Lotus root", "Beef/Pork", "Chili oil"],
    ingredientsMm: ["မာလာငရုတ်သီးဆီ", "အပ်မှို", "ကြာစွယ်", "အမဲသား/ဝက်သား", "နှမ်းဆီမွှေး"]
  },
  {
    id: 3,
    titleEn: 'Som Tum Thai & Charcoal Grilled Chicken',
    titleMm: 'သင်္ဘောသီးထောင်း နှင့် ကြက်ကင်',
    titleTh: 'ส้มตำไทย ไก่ย่างขมิ้น',
    category: 'thai',
    priceThb: 75,
    priceMmk: 9000,
    stallName: "Isan Zaab Mae Sot",
    stallNameMm: "အီဆန်သင်္ဘောသီးထောင်း",
    stallNo: "Zone A, Stall #07",
    emoji: "🥗",
    tag: "Local Favorite",
    spice: "Medium",
    rating: 4.9,
    reviewsCount: 210,
    descEn: "Zesty green papaya salad with crunchy roasted peanuts, dried shrimp, fresh lime, paired with golden turmeric grilled chicken.",
    descMm: "အချဉ်အစပ်ကွက်တိ သင်္ဘောသီးထောင်းနှင့် ရွှေဝါရောင်နနွင်းနံ့သင်းသော မီးသွေးကြက်ကင်။",
    ingredientsEn: ["Green papaya", "Lime", "Peanuts", "Turmeric grilled chicken", "Fish sauce"],
    ingredientsMm: ["သင်္ဘောသီးစိမ်း", "သံပရာသီး", "မြေပဲဆံ", "ကြက်ကင်", "ငါးငံပြာရည်"]
  },
  {
    id: 4,
    titleEn: 'Shan Traditional Sticky Noodles',
    titleMm: 'ရှမ်းခေါက်ဆွဲသုပ် / အရည်',
    titleTh: 'ก๋วยเตี๋ยวไทใหญ่ (ฉาน)',
    category: 'myanmar',
    priceThb: 50,
    priceMmk: 6000,
    stallName: "Golden Shan Kitchen",
    stallNameMm: "ရွှေရှမ်းမီးဖိုဆောင်",
    stallNo: "Zone C, Stall #21",
    emoji: "🍜",
    tag: "Traditional ⭐",
    spice: "Mild",
    rating: 5.0,
    reviewsCount: 175,
    descEn: "Silky flat rice noodles coated in savory spiced tomato chicken sauce, roasted crushed peanuts, scallions, and pickled mustard greens.",
    descMm: "ရှမ်းရိုးရာ ခေါက်ဆွဲစေးစေးလေးကို ခရမ်းချဉ်သီးကြက်သားဆီပြန်၊ မြေပဲထောင်း၊ မုန်ညင်းချဉ်တို့ဖြင့် အရသာရှိစွာ သုပ်ထားပါသည်။",
    ingredientsEn: ["Shan rice noodles", "Tomato chicken sauce", "Roasted peanuts", "Pickled greens"],
    ingredientsMm: ["ရှမ်းဆန်ခေါက်ဆွဲ", "ခရမ်းချဉ်သီးကြက်သားဟင်း", "မြေပဲထောင်း", "မုန်ညင်းချဉ်"]
  },
  {
    id: 5,
    titleEn: 'Pad Thai Goong Sod (Fresh Tiger Prawns)',
    titleMm: 'ပုစွန်လတ်လတ်ဆတ်ဆတ် ဖတ်ထိုင်း',
    titleTh: 'ผัดไทยกุ้งสด',
    category: 'thai',
    priceThb: 80,
    priceMmk: 9600,
    stallName: "Chef Chai Wok",
    stallNameMm: "ဖတ်ထိုင်းကြော်ဆိုင်",
    stallNo: "Zone A, Stall #09",
    emoji: "🍤",
    tag: "Popular",
    spice: "Mild",
    rating: 4.7,
    reviewsCount: 86,
    descEn: "Chewy thin rice noodles flash-fried with juicy prawns, sweet tamarind pulp, yellow tofu, chives, bean sprouts, and crushed peanuts.",
    descMm: "ပုစွန်အကြီးကြီး၊ မန်ကျည်းမှည့်ဆော့စ်၊ တို့ဟူး၊ ကြက်ဥ၊ ပဲပင်ပေါက်တို့ဖြင့် ထိုင်းရိုးရာအတိုင်း အရသာရှိစွာ ကြော်ထားသော ဖတ်ထိုင်း။",
    ingredientsEn: ["Fresh prawns", "Rice noodles", "Tamarind paste", "Tofu", "Egg"],
    ingredientsMm: ["ပုစွန်လတ်လတ်ဆတ်ဆတ်", "ဖတ်ထိုင်းခေါက်ဆွဲ", "မန်ကျည်းသီးအနှစ်", "တို့ဟူး"]
  },
  {
    id: 6,
    titleEn: 'Mae Sot Catfish Mohinga (မုန့်ဟင်းခါး)',
    titleMm: 'မဲဆောက်စတိုင် ငါးခူမုန့်ဟင်းခါး',
    titleTh: 'ขนมจีนพม่า (โมฮิงกา)',
    category: 'myanmar',
    priceThb: 40,
    priceMmk: 4800,
    stallName: "Daw Lay Kitchen",
    stallNameMm: "ဒေါ်လေးမုန့်ဟင်းခါး",
    stallNo: "Zone C, Stall #25",
    emoji: "🍲",
    tag: "Comfort Food",
    spice: "Mild",
    rating: 4.9,
    reviewsCount: 310,
    descEn: "Hearty catfish broth simmered with lemongrass, tender banana stem, black pepper, boiled egg slice, and crispy split-pea fritters.",
    descMm: "ငါးခူသားအနှစ်များဖြင့် အိစက်နေသော မုန့်ဟင်းခါးရည်၊ ငှက်ပျောအူ၊ ပဲကြော်မွှေးမွှေး၊ ဘဲဥတို့ဖြင့် တွဲဖက်သုံးဆောင်နိုင်ပါသည်။",
    ingredientsEn: ["Fresh catfish", "Banana stem", "Lemongrass", "Crispy pea fritter", "Egg"],
    ingredientsMm: ["ငါးခူ", "ငှက်ပျောအူ", "စပါးလင်", "ပဲကြော်", "ဘဲဥ"]
  },
  {
    id: 7,
    titleEn: 'Thai Iced Milk Tea (Cha Yen)',
    titleMm: 'ထိုင်းလက်ဖက်ရည်အေး (ချာယန်း)',
    titleTh: 'ชาไทยเย็นนมสดโบราณ',
    category: 'drinks',
    priceThb: 30,
    priceMmk: 3600,
    stallName: "Night Market Cafe",
    stallNameMm: "ညဈေးအအေးဆိုင်",
    stallNo: "Zone Entrance, Stall #01",
    emoji: "🧋",
    tag: "Refreshing ❄️",
    spice: "None",
    rating: 4.8,
    reviewsCount: 190,
    descEn: "Signature bright-orange Thai Ceylon black tea brewed fresh, combined with sweetened condensed milk and topped with evaporated creamer.",
    descMm: "ထိုင်းလက်ဖက်ခြောက်စစ်စစ်ဖြင့် ကျိုချက်ထားသော နို့စိမ်းနို့ဆီမွှေးမွှေး ချာယန်းလက်ဖက်ရည်အေး။",
    ingredientsEn: ["Thai black tea leaves", "Condensed milk", "Evaporated milk", "Ice"],
    ingredientsMm: ["ထိုင်းလက်ဖက်ခြောက်", "နို့ဆီ", "နို့စိမ်း", "ရေခဲ"]
  },
  {
    id: 8,
    titleEn: 'Mango Sticky Rice (Khao Niew Mamuang)',
    titleMm: 'သရက်သီးကောက်ညှင်းပေါင်း',
    titleTh: 'ข้าวเหนียวมะม่วงน้ำดอกไม้',
    category: 'drinks',
    priceThb: 65,
    priceMmk: 7800,
    stallName: "Sweet Mae Sot Treats",
    stallNameMm: "ရွှေမဲဆောက်အချိုပွဲ",
    stallNo: "Zone Entrance, Stall #03",
    emoji: "🥭",
    tag: "Dessert #1",
    spice: "None",
    rating: 4.9,
    reviewsCount: 165,
    descEn: "Sweet golden Nam Dok Mai mango paired with fragrant sweet coconut sticky rice and sprinkled with toasted crunchy yellow mung beans.",
    descMm: "နို့နို့မုန့်မုန့် သရက်သီးမှည့်အချိုနှင့် အုန်းနို့ကောက်ညှင်းပေါင်းမွှေးမွှေး၊ ရွှေဝါရောင် ပဲကြော်ဆမ်းထားသော အချိုပွဲ။",
    ingredientsEn: ["Ripe mango", "Glutinous rice", "Coconut cream", "Toasted mung beans"],
    ingredientsMm: ["သရက်သီးမှည့်", "ကောက်ညှင်းဆန်", "အုန်းနို့", "ပဲကြော်"]
  },
  {
    id: 9,
    titleEn: 'Grilled Giant Squid with Spicy Seafood Dip',
    titleMm: 'ပြည်ကြီးငါးကင် နှင့် အစပ်ဆော့စ်',
    titleTh: 'ปลาหมึกย่างน้ำจิ้มซีฟู้ดมะนาว',
    category: 'bbq',
    priceThb: 95,
    priceMmk: 11400,
    stallName: "Andaman Seafood Grill",
    stallNameMm: "ပင်လယ်စာအကင်ဆိုင်",
    stallNo: "Zone B, Stall #15",
    emoji: "🦑",
    tag: "Fresh Seafood",
    spice: "Medium",
    rating: 4.7,
    reviewsCount: 73,
    descEn: "Tender whole squid charcoal grilled, brushed with aromatic garlic butter, served with fiery green chili lime cilantro dipping sauce.",
    descMm: "မီးသွေးပြင်းပြင်းဖြင့် ကင်ထားသော ပြည်ကြီးငါးကင်နှင့် သံပရာသီးစိမ်း၊ ငရုတ်သီးစိမ်းတို့ဖြင့် ပြုလုပ်ထားသော ပင်လယ်စာအစပ်ဆော့စ်။",
    ingredientsEn: ["Fresh squid", "Garlic", "Green chili", "Lime juice", "Fish sauce"],
    ingredientsMm: ["ပြည်ကြီးငါး", "ကြက်သွန်ဖြူ", "ငရုတ်သီးစိမ်း", "သံပရာရည်"]
  },
  {
    id: 10,
    titleEn: 'Mala Skewers (Beef, Enoki, Bacon)',
    titleMm: 'မာလာအကင်တုတ်မျိုးစုံ',
    titleTh: 'หมาล่าปิ้งย่างเสียบไม้',
    category: 'mala',
    priceThb: 20,
    priceMmk: 2400,
    stallName: "Mae Sot BBQ Master",
    stallNameMm: "မဲဆောက်အကင်ဘုရင်",
    stallNo: "Zone A, Stall #04",
    emoji: "🍢",
    tag: "Must Try",
    spice: "Very Hot",
    rating: 4.8,
    reviewsCount: 115,
    descEn: "Skewers of bacon-wrapped enoki mushrooms, tender beef cuts, and quail eggs generously dusted with tongue-tingling mala pepper powder.",
    descMm: "အပ်မှိုဝက်သားလိပ်၊ အမဲသား၊ ငုံးဥတုတ်များကို လျှာထုံမွှေး မာလာအမှုန့်ဖြူးကာ ကင်ထားသော နာမည်ကြီး ညဈေးအကင်တုတ်များ။",
    ingredientsEn: ["Bacon & Enoki", "Beef slices", "Sichuan chili spice"],
    ingredientsMm: ["ဝက်သားပြား", "အပ်မှို", "အမဲသား", "မာလာအမှုန့်"]
  },
  {
    id: 11,
    titleEn: 'Golden Crispy Potato Samusas (5 pcs)',
    titleMm: 'မဲဆောက်စတိုင် အာလူးစမူဆာကြော်',
    titleTh: 'ซาโมซ่ามันฝรั่งทอดกรอบ',
    category: 'myanmar',
    priceThb: 30,
    priceMmk: 3600,
    stallName: "Daw Lay Kitchen",
    stallNameMm: "ဒေါ်လေးမုန့်ဟင်းခါး",
    stallNo: "Zone C, Stall #25",
    emoji: "🥟",
    tag: "Crispy Snack",
    spice: "Mild",
    rating: 4.6,
    reviewsCount: 64,
    descEn: "Five crispy fried triangle pastries loaded with cumin-spiced mashed potatoes, mint leaves, and onions, served with tangy tamarind dip.",
    descMm: "အာလူး၊ ဇီယာ၊ ပူဒီနာတို့ဖြင့် အရသာစပ်ထားသော ရွှေဝါရောင် စမူဆာကြော် ၅ ခုနှင့် မန်ကျည်းသီးအချဉ်ရည်။",
    ingredientsEn: ["Potato filling", "Cumin & mint", "Pastry shell", "Tamarind chutney"],
    ingredientsMm: ["အာလူး", "ဇီယာ", "ပူဒီနာ", "မန်ကျည်းသီးရည်"]
  },
  {
    id: 12,
    titleEn: 'Fresh Avocado Young Coconut Smoothie',
    titleMm: 'ထောပတ်သီး အုန်းနို့ဖျော်ရည်',
    titleTh: 'อะโวคาโดปั่นมะพร้าวอ่อนน้ำหอม',
    category: 'drinks',
    priceThb: 50,
    priceMmk: 6000,
    stallName: "Night Market Cafe",
    stallNameMm: "ညဈေးအအေးဆိုင်",
    stallNo: "Zone Entrance, Stall #01",
    emoji: "🥑",
    tag: "Creamy & Cold",
    spice: "None",
    rating: 4.9,
    reviewsCount: 89,
    descEn: "Rich, creamy fresh avocado blended smoothly with sweet young coconut water, coconut flesh, and light condensed milk.",
    descMm: "လတ်ဆတ်သော ထောပတ်သီးစစ်စစ်ကို အုန်းရည်နုနု၊ အုန်းသား၊ နို့စိမ်းတို့ဖြင့် အိစက်ညက်ညောစွာ ဖျော်ထားသော အအေး။",
    ingredientsEn: ["Fresh avocado", "Young coconut water", "Milk", "Honey/Syrup"],
    ingredientsMm: ["ထောပတ်သီး", "အုန်းရည်နု", "နို့စိမ်း", "ပျားရည်"]
  }
];
