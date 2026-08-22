/**
 * 服装电商商品数据
 *
 * 目前为本地 mock 数据，后续可平滑迁移到 Supabase：
 * 只需把 getAllProducts / getProductBySlug 换成数据库查询即可，
 * 页面组件不需要改动。
 *
 * 图片使用 Unsplash 图库图占位，每张都已人工核对过内容与商品对应，
 * 并避开了带品牌 logo 的照片。上线前请全部替换为自有商品图。
 */

import type { Locale } from "@/lib/i18n";

/** 双语文案（中文站点显示 zh，其余语言回退到 en） */
export interface LocalizedText {
  en: string;
  zh: string;
}

export type CategoryId = "women" | "men" | "accessories";

export interface ProductColor {
  /** 颜色标识，用于 URL / 选中态 */
  id: string;
  name: LocalizedText;
  /** 色卡颜色 */
  hex: string;
}

export type ProductBadge = "new" | "bestseller" | "sale";

export interface Product {
  slug: string;
  name: LocalizedText;
  category: CategoryId;
  /** 系列名，用于 Lookbook 分组与关联推荐 */
  collection: LocalizedText;
  /** 售价（美元） */
  price: number;
  /** 划线原价，有值时展示折扣 */
  compareAtPrice?: number;
  /** 商品图；有第二张时卡片 hover 会切换 */
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  badge?: ProductBadge;
  material: LocalizedText;
  description: LocalizedText;
  details: LocalizedText[];
  care: LocalizedText;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  /** 首页「精选」区块展示 */
  featured?: boolean;
  /** 上架序号，越大越新 */
  arrivalOrder: number;
}

/* ---------------------------------- 常量 --------------------------------- */

const IMG = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"] as const;
export const WAIST_SIZES = ["28", "30", "32", "34", "36"] as const;
export const SHOE_SIZES = ["39", "40", "41", "42", "43", "44"] as const;
export const ONE_SIZE = ["ONE SIZE"] as const;

const COLORS = {
  black: { id: "black", name: { en: "Black", zh: "黑色" }, hex: "#141414" },
  white: { id: "white", name: { en: "White", zh: "白色" }, hex: "#FFFFFF" },
  ivory: { id: "ivory", name: { en: "Ivory", zh: "米白" }, hex: "#F1EDE4" },
  sand: { id: "sand", name: { en: "Sand", zh: "沙色" }, hex: "#D8C9B4" },
  grey: { id: "grey", name: { en: "Grey Melange", zh: "麻灰" }, hex: "#9B9B98" },
  navy: { id: "navy", name: { en: "Navy", zh: "藏青" }, hex: "#20293B" },
  camel: { id: "camel", name: { en: "Camel", zh: "驼色" }, hex: "#B4885C" },
  olive: { id: "olive", name: { en: "Olive", zh: "橄榄绿" }, hex: "#5B5F45" },
  sage: { id: "sage", name: { en: "Sage", zh: "灰绿" }, hex: "#8C9A83" },
  indigo: { id: "indigo", name: { en: "Indigo", zh: "靛蓝" }, hex: "#39496B" },
  chambray: {
    id: "chambray",
    name: { en: "Chambray", zh: "浅蓝" },
    hex: "#7B94B1",
  },
  espresso: {
    id: "espresso",
    name: { en: "Espresso", zh: "深棕" },
    hex: "#4B372B",
  },
  oxblood: { id: "oxblood", name: { en: "Oxblood", zh: "酒红" }, hex: "#6E2A2A" },
  rouge: { id: "rouge", name: { en: "Rouge", zh: "正红" }, hex: "#A62A32" },
} satisfies Record<string, ProductColor>;

export const CATEGORIES: Array<{
  id: CategoryId;
  name: LocalizedText;
  tagline: LocalizedText;
  image: string;
}> = [
  {
    id: "women",
    name: { en: "Women", zh: "女装" },
    tagline: { en: "Tailored ease", zh: "松弛的剪裁" },
    // 街拍：女士长款大衣
    image: IMG("photo-1539109136881-3be0616acf4b", 1200),
  },
  {
    id: "men",
    name: { en: "Men", zh: "男装" },
    tagline: { en: "Quiet structure", zh: "克制的结构" },
    // 街拍：男士驼色大衣
    image: IMG("photo-1553143820-6bb68bc34679", 1200),
  },
  {
    id: "accessories",
    name: { en: "Accessories", zh: "配饰" },
    tagline: { en: "The finishing line", zh: "收尾的细节" },
    // 平铺：皮靴、皮带、腕表
    image: IMG("photo-1479064555552-3ef4979f8908", 1200),
  },
];

/* --------------------------------- 商品数据 -------------------------------- */

export const PRODUCTS: Product[] = [
  /* ---------------------------------- 女装 --------------------------------- */
  {
    slug: "oversized-cotton-tee",
    name: { en: "Oversized Cotton Tee", zh: "宽松纯棉 T 恤" },
    category: "women",
    collection: { en: "Essentials", zh: "基础系列" },
    price: 45,
    images: [
      IMG("photo-1581655353564-df123a1eb820"),
      IMG("photo-1613852348851-df1739db8201"),
    ],
    colors: [COLORS.white, COLORS.black, COLORS.sand],
    sizes: [...APPAREL_SIZES],
    badge: "bestseller",
    material: { en: "100% Organic Cotton, 240gsm", zh: "100% 有机棉，240 克重" },
    description: {
      en: "A heavyweight tee cut with a dropped shoulder and a boxy body. Garment-dyed for a soft, lived-in hand from the first wear.",
      zh: "重磅落肩版型，方正廓形。成衣染色工艺，第一次上身就有柔软的旧衣质感。",
    },
    details: [
      { en: "Dropped shoulder, boxy fit", zh: "落肩设计，方正廓形" },
      { en: "Ribbed crew neckline", zh: "罗纹圆领" },
      { en: "Model is 175cm, wearing size S", zh: "模特身高 175cm，穿着 S 码" },
    ],
    care: { en: "Machine wash cold, tumble dry low", zh: "冷水机洗，低温烘干" },
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    featured: true,
    arrivalOrder: 12,
  },
  {
    slug: "wool-blend-overcoat",
    name: { en: "Wool-Blend Overcoat", zh: "羊毛混纺长大衣" },
    category: "women",
    collection: { en: "Winter Atelier", zh: "冬日工坊" },
    price: 289,
    compareAtPrice: 360,
    images: [
      IMG("photo-1554412933-514a83d2f3c8"),
      IMG("photo-1483985988355-763728e1935b"),
    ],
    colors: [COLORS.black, COLORS.camel, COLORS.navy],
    sizes: [...APPAREL_SIZES],
    badge: "sale",
    material: {
      en: "70% Wool, 30% Recycled Polyester",
      zh: "70% 羊毛，30% 再生聚酯纤维",
    },
    description: {
      en: "A single-breasted overcoat with a clean lapel and a longline silhouette that falls just below the knee.",
      zh: "单排扣设计，干净的翻领线条，及膝以下的长版廓形。",
    },
    details: [
      { en: "Fully lined, two welt pockets", zh: "全内衬，双开线口袋" },
      { en: "Horn-effect buttons", zh: "仿牛角纽扣" },
      { en: "Model is 178cm, wearing size M", zh: "模特身高 178cm，穿着 M 码" },
    ],
    care: { en: "Dry clean only", zh: "仅可干洗" },
    rating: 4.9,
    reviewCount: 86,
    inStock: true,
    featured: true,
    arrivalOrder: 18,
  },
  {
    slug: "cropped-denim-jacket",
    name: { en: "Cropped Denim Jacket", zh: "短款丹宁夹克" },
    category: "women",
    collection: { en: "Denim Workshop", zh: "丹宁工坊" },
    price: 148,
    images: [
      IMG("photo-1543076447-215ad9ba6923"),
      IMG("photo-1495105787522-5334e3ffa0ef"),
    ],
    colors: [COLORS.chambray, COLORS.indigo, COLORS.white],
    sizes: [...APPAREL_SIZES],
    badge: "new",
    material: { en: "12oz Rigid Cotton Denim", zh: "12 盎司硬挺纯棉丹宁" },
    description: {
      en: "A cropped trucker with a slightly boxy shoulder — sits right at the waistband.",
      zh: "短款工装夹克，肩线略方，长度刚好落在腰线。",
    },
    details: [
      { en: "Cropped boxy fit", zh: "短款方正廓形" },
      { en: "Chest flap pockets", zh: "胸前翻盖口袋" },
      { en: "Model is 172cm, wearing size S", zh: "模特身高 172cm，穿着 S 码" },
    ],
    care: { en: "Wash cold inside out", zh: "翻面冷水洗" },
    rating: 4.7,
    reviewCount: 118,
    inStock: true,
    featured: true,
    arrivalOrder: 21,
  },
  {
    slug: "wide-leg-trousers",
    name: { en: "Wide-Leg Trousers", zh: "阔腿长裤" },
    category: "women",
    collection: { en: "Tailoring", zh: "西装系列" },
    price: 155,
    images: [
      IMG("photo-1566206091558-7f218b696731"),
      IMG("photo-1517445312882-bc9910d016b7"),
    ],
    colors: [COLORS.ivory, COLORS.sand, COLORS.black],
    sizes: [...APPAREL_SIZES],
    material: { en: "Tencel™ Lyocell Twill", zh: "天丝™ 莱赛尔斜纹面料" },
    description: {
      en: "High-rise with a pressed centre crease and a fluid leg that skims the floor.",
      zh: "高腰版型，前片压烫中缝，垂顺裤腿轻扫地面。",
    },
    details: [
      { en: "High-rise, pressed crease", zh: "高腰，压烫中缝" },
      { en: "Hook-and-bar closure", zh: "裤钩暗扣" },
      { en: "Inseam 78cm on size M", zh: "M 码内长 78cm" },
    ],
    care: { en: "Machine wash cold, warm iron", zh: "冷水机洗，中温熨烫" },
    rating: 4.7,
    reviewCount: 97,
    inStock: true,
    featured: true,
    arrivalOrder: 14,
  },
  {
    slug: "fringed-knit-wrap",
    name: { en: "Fringed Knit Wrap", zh: "流苏针织披肩" },
    category: "women",
    collection: { en: "Winter Atelier", zh: "冬日工坊" },
    price: 165,
    images: [
      IMG("photo-1434389677669-e08b4cac3105"),
      IMG("photo-1509319117193-57bab727e09d"),
    ],
    colors: [COLORS.ivory, COLORS.camel, COLORS.grey],
    sizes: [...ONE_SIZE],
    badge: "bestseller",
    material: { en: "70% Merino Wool, 30% Alpaca", zh: "70% 美利奴羊毛，30% 羊驼毛" },
    description: {
      en: "A chunky hand-finished wrap that throws over everything — knitted loose so it drapes instead of bulking.",
      zh: "手工收边的粗针披肩，什么都能罩。织得松，所以是垂下来而不是撑起来。",
    },
    details: [
      { en: "Hand-knotted fringe", zh: "手工打结流苏" },
      { en: "One size, 120cm across", zh: "均码，展开宽 120cm" },
      { en: "Knitted in Peru", zh: "秘鲁织造" },
    ],
    care: { en: "Hand wash cold, dry flat", zh: "冷水手洗，平铺晾干" },
    rating: 4.9,
    reviewCount: 301,
    inStock: true,
    featured: true,
    arrivalOrder: 19,
  },
  {
    slug: "bias-cut-maxi-dress",
    name: { en: "Bias-Cut Maxi Dress", zh: "斜裁长裙" },
    category: "women",
    collection: { en: "Evening", zh: "晚装系列" },
    price: 198,
    images: [
      IMG("photo-1595777457583-95e059d581b8"),
      IMG("photo-1572804013309-59a88b7e92f1"),
    ],
    colors: [COLORS.rouge, COLORS.black, COLORS.ivory],
    sizes: [...APPAREL_SIZES],
    badge: "new",
    material: { en: "100% Viscose Crepe", zh: "100% 粘胶绉纱" },
    description: {
      en: "Cut on the bias so it moves with you. Adjustable straps and a French seam finish throughout.",
      zh: "斜裁工艺，随身形自然垂坠。可调节肩带，通身法式包缝。",
    },
    details: [
      { en: "Bias cut, adjustable straps", zh: "斜裁，肩带可调节" },
      { en: "Maxi length, side slit", zh: "长款，侧开衩" },
      { en: "Model is 176cm, wearing size S", zh: "模特身高 176cm，穿着 S 码" },
    ],
    care: { en: "Hand wash cold or dry clean", zh: "冷水手洗或干洗" },
    rating: 4.7,
    reviewCount: 132,
    inStock: true,
    featured: true,
    arrivalOrder: 22,
  },
  {
    slug: "poplin-shirt-dress",
    name: { en: "Poplin Shirt Dress", zh: "府绸衬衫裙" },
    category: "women",
    collection: { en: "Summer Weight", zh: "轻夏系列" },
    price: 168,
    images: [
      IMG("photo-1515372039744-b8f02a3ae446"),
      IMG("photo-1445205170230-053b83016050"),
    ],
    colors: [COLORS.white, COLORS.sand, COLORS.navy],
    sizes: [...APPAREL_SIZES],
    material: { en: "Compact Cotton Poplin", zh: "高支纯棉府绸" },
    description: {
      en: "A shirt dress with a removable belt, so it works both cinched and loose.",
      zh: "衬衫裙设计，配可拆卸腰带——收腰或宽松两种穿法。",
    },
    details: [
      { en: "Removable self-tie belt", zh: "可拆卸同料腰带" },
      { en: "Side seam pockets", zh: "侧缝口袋" },
      { en: "Midi length", zh: "中长款" },
    ],
    care: { en: "Machine wash cold, warm iron", zh: "冷水机洗，中温熨烫" },
    rating: 4.6,
    reviewCount: 79,
    inStock: true,
    arrivalOrder: 7,
  },
  {
    slug: "utility-cargo-trousers",
    name: { en: "Utility Cargo Trousers", zh: "工装口袋长裤" },
    category: "women",
    collection: { en: "Essentials", zh: "基础系列" },
    price: 138,
    images: [
      IMG("photo-1552902865-b72c031ac5ea"),
      IMG("photo-1594633312681-425c7b97ccd1"),
    ],
    colors: [COLORS.olive, COLORS.sand, COLORS.black],
    sizes: [...APPAREL_SIZES],
    material: { en: "Washed Cotton Ripstop", zh: "水洗棉格子布" },
    description: {
      en: "Tapered through the leg with a drawcord hem, so you can decide how much break it has.",
      zh: "收腿版型，裤脚抽绳——堆叠多少由你决定。",
    },
    details: [
      { en: "Six pockets, bellowed sides", zh: "六个口袋，侧边风箱袋" },
      { en: "Drawcord hem", zh: "裤脚抽绳" },
      { en: "Model is 174cm, wearing size M", zh: "模特身高 174cm，穿着 M 码" },
    ],
    care: { en: "Machine wash cold, hang dry", zh: "冷水机洗，悬挂晾干" },
    rating: 4.6,
    reviewCount: 68,
    inStock: true,
    arrivalOrder: 15,
  },

  /* ---------------------------------- 男装 --------------------------------- */
  {
    slug: "washed-cotton-shirt",
    name: { en: "Washed Cotton Shirt", zh: "水洗棉衬衫" },
    category: "men",
    collection: { en: "Summer Weight", zh: "轻夏系列" },
    price: 118,
    images: [
      IMG("photo-1596755094514-f87e34085b2c"),
      IMG("photo-1602810318383-e386cc2a3ccf"),
    ],
    colors: [COLORS.chambray, COLORS.white, COLORS.sage],
    sizes: [...APPAREL_SIZES],
    badge: "new",
    material: { en: "100% Garment-Washed Cotton", zh: "100% 成衣水洗棉" },
    description: {
      en: "Washed after making so it arrives soft, with a soft collar and a relaxed body.",
      zh: "成衣水洗，到手就是软的。软领设计，宽松版型。",
    },
    details: [
      { en: "Relaxed fit, curved hem", zh: "宽松版型，弧形下摆" },
      { en: "Corozo nut buttons", zh: "果实纽扣" },
      { en: "Model is 185cm, wearing size L", zh: "模特身高 185cm，穿着 L 码" },
    ],
    care: { en: "Machine wash cold, tumble dry low", zh: "冷水机洗，低温烘干" },
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    featured: true,
    arrivalOrder: 20,
  },
  {
    slug: "selvedge-denim-jeans",
    name: { en: "Selvedge Denim Jeans", zh: "赤耳丹宁牛仔裤" },
    category: "men",
    collection: { en: "Denim Workshop", zh: "丹宁工坊" },
    price: 175,
    images: [
      IMG("photo-1604176354204-9268737828e4"),
      IMG("photo-1525507119028-ed4c629a60a3"),
    ],
    colors: [COLORS.indigo, COLORS.black],
    sizes: [...WAIST_SIZES],
    badge: "bestseller",
    material: {
      en: "13.5oz Japanese Selvedge Denim",
      zh: "13.5 盎司日本赤耳丹宁",
    },
    description: {
      en: "Woven on shuttle looms in Okayama, cut to a straight leg with a mid rise. Raw — it will fade to you.",
      zh: "冈山梭织机织造，中腰直筒版型。原色未洗，会随着穿着落色成你的样子。",
    },
    details: [
      { en: "Straight leg, mid rise", zh: "直筒版型，中腰" },
      { en: "Copper rivets, chain-stitch hem", zh: "铜质铆钉，链式缝下摆" },
      { en: "Raw denim — expect shrinkage", zh: "原色丹宁，首次下水会缩水" },
    ],
    care: { en: "Wash cold inside out, hang dry", zh: "翻面冷水洗，悬挂晾干" },
    rating: 4.9,
    reviewCount: 248,
    inStock: true,
    featured: true,
    arrivalOrder: 17,
  },
  {
    slug: "heavyweight-hoodie",
    name: { en: "Heavyweight Hoodie", zh: "重磅连帽卫衣" },
    category: "men",
    collection: { en: "Essentials", zh: "基础系列" },
    price: 138,
    images: [
      IMG("photo-1556821840-3a63f95609a7"),
      IMG("photo-1620799140408-edc6dcb6d633"),
    ],
    colors: [COLORS.grey, COLORS.ivory, COLORS.black],
    sizes: [...APPAREL_SIZES],
    material: { en: "480gsm Loopback Cotton", zh: "480 克重毛圈棉" },
    description: {
      en: "Brushed loopback cotton with a double-layer hood and ribbing that holds its shape wash after wash.",
      zh: "磨毛毛圈棉，双层帽体，罗纹在反复水洗后依然不变形。",
    },
    details: [
      { en: "Double-layer hood", zh: "双层帽体" },
      { en: "Kangaroo pocket", zh: "袋鼠口袋" },
      { en: "Model is 183cm, wearing size L", zh: "模特身高 183cm，穿着 L 码" },
    ],
    care: { en: "Machine wash cold, tumble dry low", zh: "冷水机洗，低温烘干" },
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    arrivalOrder: 13,
  },
  {
    slug: "unstructured-blazer",
    name: { en: "Unstructured Blazer", zh: "无衬西装外套" },
    category: "men",
    collection: { en: "Tailoring", zh: "西装系列" },
    price: 325,
    images: [
      IMG("photo-1521341057461-6eb5f40b07ab"),
      IMG("photo-1610652492500-ded49ceeb378"),
    ],
    colors: [COLORS.navy, COLORS.black, COLORS.camel],
    sizes: [...APPAREL_SIZES],
    badge: "new",
    material: { en: "Wool-Linen Blend", zh: "羊毛亚麻混纺" },
    description: {
      en: "No shoulder pads, no canvas — just a soft jacket you can wear like a shirt.",
      zh: "无垫肩、无衬布，一件可以像衬衫一样随意穿的软西装。",
    },
    details: [
      { en: "Unlined, patch pockets", zh: "无内衬，贴袋设计" },
      { en: "Two-button front", zh: "双扣门襟" },
      { en: "Model is 186cm, wearing size M", zh: "模特身高 186cm，穿着 M 码" },
    ],
    care: { en: "Dry clean only", zh: "仅可干洗" },
    rating: 4.8,
    reviewCount: 54,
    inStock: true,
    featured: true,
    arrivalOrder: 23,
  },
  {
    slug: "leather-biker-jacket",
    name: { en: "Leather Biker Jacket", zh: "皮革机车夹克" },
    category: "men",
    collection: { en: "Winter Atelier", zh: "冬日工坊" },
    price: 545,
    images: [
      IMG("photo-1487222477894-8943e31ef7b2"),
      IMG("photo-1551028719-00167b16eac5"),
    ],
    colors: [COLORS.espresso, COLORS.black],
    sizes: [...APPAREL_SIZES],
    material: { en: "Full-Grain Lambskin", zh: "全粒面小羊皮" },
    description: {
      en: "An asymmetric zip in lambskin soft enough to wear from day one, lined in cupro.",
      zh: "不对称拉链设计，小羊皮柔软到第一天就能穿。铜氨丝内衬。",
    },
    details: [
      { en: "Asymmetric zip closure", zh: "不对称拉链门襟" },
      { en: "Cupro lining", zh: "铜氨丝内衬" },
      { en: "Snap-down lapels", zh: "翻领可按扣固定" },
    ],
    care: { en: "Leather specialist clean only", zh: "仅可皮革专业清洗" },
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    arrivalOrder: 16,
  },
  {
    slug: "camel-wool-coat",
    name: { en: "Camel Wool Coat", zh: "驼色羊毛大衣" },
    category: "men",
    collection: { en: "Winter Atelier", zh: "冬日工坊" },
    price: 425,
    compareAtPrice: 520,
    images: [
      IMG("photo-1553143820-6bb68bc34679"),
      IMG("photo-1591047139829-d91aecb6caea"),
    ],
    colors: [COLORS.camel, COLORS.navy, COLORS.black],
    sizes: [...APPAREL_SIZES],
    badge: "sale",
    material: { en: "80% Wool, 20% Cashmere", zh: "80% 羊毛，20% 羊绒" },
    description: {
      en: "A knee-length overcoat with a notch lapel and enough room to layer a jacket underneath.",
      zh: "及膝长度，平驳领，内搭一件外套也不局促。",
    },
    details: [
      { en: "Notch lapel, three buttons", zh: "平驳领，三粒扣" },
      { en: "Centre back vent", zh: "后中开衩" },
      { en: "Model is 188cm, wearing size L", zh: "模特身高 188cm，穿着 L 码" },
    ],
    care: { en: "Dry clean only", zh: "仅可干洗" },
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    featured: true,
    arrivalOrder: 24,
  },
  {
    slug: "cotton-overshirt",
    name: { en: "Cotton Overshirt", zh: "纯棉衬衫外套" },
    category: "men",
    collection: { en: "Essentials", zh: "基础系列" },
    price: 165,
    images: [
      IMG("photo-1523381210434-271e8be1f52b"),
      IMG("photo-1544022613-e87ca75a784a"),
    ],
    colors: [COLORS.sage, COLORS.olive, COLORS.sand],
    sizes: [...APPAREL_SIZES],
    material: { en: "Heavy Cotton Twill", zh: "厚重棉斜纹" },
    description: {
      en: "Halfway between a shirt and a jacket — wear it open over a tee or buttoned as a light layer.",
      zh: "介于衬衫和外套之间——敞开套 T 恤，或扣起来当薄外套。",
    },
    details: [
      { en: "Two chest patch pockets", zh: "胸前双贴袋" },
      { en: "Shirt collar, boxy cut", zh: "衬衫领，方正版型" },
      { en: "Model is 182cm, wearing size M", zh: "模特身高 182cm，穿着 M 码" },
    ],
    care: { en: "Machine wash cold, hang dry", zh: "冷水机洗，悬挂晾干" },
    rating: 4.7,
    reviewCount: 92,
    inStock: false,
    arrivalOrder: 11,
  },

  /* ---------------------------------- 配饰 --------------------------------- */
  {
    slug: "canvas-backpack",
    name: { en: "Waxed Canvas Backpack", zh: "上蜡帆布双肩包" },
    category: "accessories",
    collection: { en: "Everyday Carry", zh: "日常携行" },
    price: 245,
    images: [
      IMG("photo-1547949003-9792a18a2601"),
      IMG("photo-1553062407-98eeb64c6a62"),
    ],
    colors: [COLORS.olive, COLORS.navy, COLORS.black],
    sizes: [...ONE_SIZE],
    badge: "bestseller",
    material: {
      en: "Waxed Cotton Canvas, Leather Trim",
      zh: "上蜡棉帆布，皮革包边",
    },
    description: {
      en: 'Fits a 16" laptop with room to spare. The wax finish sheds a light rain and ages into something better.',
      zh: "可容纳 16 寸笔记本还有余量。上蜡表面能挡小雨，越用越有味道。",
    },
    details: [
      { en: 'Padded 16" laptop sleeve', zh: "16 寸笔记本加厚隔层" },
      { en: "Leather-trimmed straps", zh: "皮革包边肩带" },
      { en: "22L capacity", zh: "22 升容量" },
    ],
    care: { en: "Spot clean, re-wax annually", zh: "局部清洁，每年重新上蜡" },
    rating: 4.8,
    reviewCount: 73,
    inStock: true,
    featured: true,
    arrivalOrder: 10,
  },
  {
    slug: "leather-lace-up-boots",
    name: { en: "Leather Lace-Up Boots", zh: "皮革系带短靴" },
    category: "accessories",
    collection: { en: "Winter Atelier", zh: "冬日工坊" },
    price: 340,
    images: [
      IMG("photo-1608256246200-53e635b5b65f"),
      IMG("photo-1605812860427-4024433a70fd"),
    ],
    colors: [COLORS.espresso, COLORS.black],
    sizes: [...SHOE_SIZES],
    material: {
      en: "Full-Grain Leather, Goodyear Welt",
      zh: "全粒面牛皮，固特异沿条",
    },
    description: {
      en: "Goodyear welted so they can be resoled. Broken in within a week and good for a decade after.",
      zh: "固特异沿条工艺，可换底修复。一周磨合期，之后能穿十年。",
    },
    details: [
      { en: "Goodyear welt, resoleable", zh: "固特异沿条，可更换鞋底" },
      { en: "Leather-lined", zh: "全皮内里" },
      { en: "Commando rubber outsole", zh: "橡胶大底" },
    ],
    care: { en: "Polish regularly, use shoe trees", zh: "定期打理，建议使用鞋撑" },
    rating: 4.9,
    reviewCount: 62,
    inStock: true,
    featured: true,
    arrivalOrder: 9,
  },
  {
    slug: "leather-derby-shoes",
    name: { en: "Leather Derby Shoes", zh: "皮革德比鞋" },
    category: "accessories",
    collection: { en: "Tailoring", zh: "西装系列" },
    price: 295,
    images: [
      IMG("photo-1449505278894-297fdb3edbc1"),
      IMG("photo-1479064555552-3ef4979f8908"),
    ],
    colors: [COLORS.oxblood, COLORS.espresso, COLORS.black],
    sizes: [...SHOE_SIZES],
    material: { en: "Hand-Burnished Calf Leather", zh: "手工擦色小牛皮" },
    description: {
      en: "An open-lacing derby burnished by hand, so no two pairs come out quite the same.",
      zh: "外耳式德比，手工擦色——没有两双颜色是完全一样的。",
    },
    details: [
      { en: "Open lacing, five eyelets", zh: "外耳式，五对鞋眼" },
      { en: "Leather sole with rubber insert", zh: "皮底嵌橡胶防滑片" },
      { en: "Made in Portugal", zh: "葡萄牙制造" },
    ],
    care: { en: "Polish regularly, use shoe trees", zh: "定期打理，建议使用鞋撑" },
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    arrivalOrder: 8,
  },
  {
    slug: "wool-felt-hat",
    name: { en: "Wool Felt Hat", zh: "羊毛毡帽" },
    category: "accessories",
    collection: { en: "Everyday Carry", zh: "日常携行" },
    price: 128,
    images: [
      IMG("photo-1533055640609-24b498dfd74c"),
      IMG("photo-1560343090-f0409e92791a"),
    ],
    colors: [COLORS.navy, COLORS.black, COLORS.camel],
    sizes: [...ONE_SIZE],
    badge: "new",
    material: { en: "100% Wool Felt, Grosgrain Band", zh: "100% 羊毛毡，罗缎帽带" },
    description: {
      en: "A structured brim that holds its shape, with an inner band you can adjust to your head.",
      zh: "定型帽檐不塌，内圈帽带可按头围调节。",
    },
    details: [
      { en: "7cm brim, pinched crown", zh: "7cm 帽檐，捏顶造型" },
      { en: "Adjustable inner band", zh: "内圈可调帽带" },
      { en: "Made in Italy", zh: "意大利制造" },
    ],
    care: { en: "Brush clean, store on the crown", zh: "软刷清洁，倒扣存放" },
    rating: 4.6,
    reviewCount: 54,
    inStock: true,
    arrivalOrder: 6,
  },
  {
    slug: "round-frame-sunglasses",
    name: { en: "Round-Frame Sunglasses", zh: "圆框太阳镜" },
    category: "accessories",
    collection: { en: "Everyday Carry", zh: "日常携行" },
    price: 165,
    images: [IMG("photo-1511499767150-a48a237f0083")],
    colors: [COLORS.camel, COLORS.black],
    sizes: [...ONE_SIZE],
    material: {
      en: "Titanium Frame, CR-39 Lenses",
      zh: "钛合金镜架，CR-39 镜片",
    },
    description: {
      en: "A thin round frame in titanium — light enough that you forget you have them on.",
      zh: "钛合金细圆框，轻到会忘记自己戴着。",
    },
    details: [
      { en: "UV400 protection", zh: "UV400 防护" },
      { en: "Adjustable nose pads", zh: "可调鼻托" },
      { en: "Includes hard case", zh: "含硬质眼镜盒" },
    ],
    care: { en: "Clean with the supplied cloth", zh: "使用随附镜布擦拭" },
    rating: 4.5,
    reviewCount: 87,
    inStock: true,
    arrivalOrder: 5,
  },
];

/* --------------------------------- 查询函数 -------------------------------- */

export function t(text: LocalizedText, locale: Locale): string {
  return locale === "zh" || locale === "zh-TW" ? text.zh : text.en;
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => b.arrivalOrder - a.arrivalOrder)
    .slice(0, limit);
}

/** 同系列优先，其次同类目，用于详情页「你可能也喜欢」 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCollection = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.collection.en === product.collection.en,
  );
  const sameCategory = PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category === product.category &&
      !sameCollection.includes(p),
  );
  return [...sameCollection, ...sameCategory].slice(0, limit);
}

/** 所有出现过的颜色，用于列表页筛选 */
export function getAllColors(): ProductColor[] {
  const map = new Map<string, ProductColor>();
  PRODUCTS.forEach((p) => p.colors.forEach((c) => map.set(c.id, c)));
  return [...map.values()];
}

/** 所有出现过的尺码，按 服装码 → 腰围码 → 鞋码 → 均码 排序 */
export function getAllSizes(): string[] {
  const set = new Set<string>();
  PRODUCTS.forEach((p) => p.sizes.forEach((s) => set.add(s)));
  const order = [
    ...APPAREL_SIZES,
    ...WAIST_SIZES,
    ...SHOE_SIZES,
    ...ONE_SIZE,
  ] as string[];
  return [...set].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(0)}`;
}
