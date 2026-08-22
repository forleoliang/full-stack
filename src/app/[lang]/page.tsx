import { Metadata } from "next";
import { defaultMetadata } from "@/app/metadata";
import { getText, LOCALE_CODES, type Locale } from "@/lib/i18n";
import ShopLayout from "@/components/shop/ShopLayout";
import Hero from "@/components/shop/sections/Hero";
import CategoryTiles from "@/components/shop/sections/CategoryTiles";
import FeaturedProducts from "@/components/shop/sections/FeaturedProducts";
import NewArrivals from "@/components/shop/sections/NewArrivals";
import Lookbook from "@/components/shop/sections/Lookbook";
import BrandStory from "@/components/shop/sections/BrandStory";
import Reviews from "@/components/shop/sections/Reviews";
import ShopFAQ from "@/components/shop/sections/ShopFAQ";
import Newsletter from "@/components/shop/sections/Newsletter";

export const revalidate = 300;

// 生成静态路径
export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

// 生成动态元数据
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = (await params) as { lang: string };
  const resolvedSearchParams = (await searchParams) as { lang?: string };

  let targetLang = resolvedParams.lang;

  const validLocales = LOCALE_CODES as readonly string[];
  if (
    resolvedSearchParams.lang &&
    validLocales.includes(resolvedSearchParams.lang)
  ) {
    targetLang = resolvedSearchParams.lang;
  }

  const isTargetLang = validLocales.includes(targetLang)
    ? (targetLang as Locale)
    : "en";

  const base = (defaultMetadata[isTargetLang] ||
    defaultMetadata.en) as Metadata;

  const title = `${getText("shop.brand", isTargetLang)} — ${getText("shop.hero.title", isTargetLang)}`;
  const description = getText("shop.hero.subtitle", isTargetLang);

  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = (await params) as { lang: string };
  const currentLocale: Locale = LOCALE_CODES.includes(
    resolvedParams.lang as Locale,
  )
    ? (resolvedParams.lang as Locale)
    : "en";

  return (
    <ShopLayout currentLocale={currentLocale}>
      {/* 主视觉 */}
      <Hero currentLocale={currentLocale} />

      {/* 分类入口 */}
      <CategoryTiles currentLocale={currentLocale} />

      {/* 精选单品 */}
      <FeaturedProducts currentLocale={currentLocale} />

      {/* 穿搭画册 */}
      <Lookbook currentLocale={currentLocale} />

      {/* 本周新品 */}
      <NewArrivals currentLocale={currentLocale} />

      {/* 品牌故事 */}
      <BrandStory currentLocale={currentLocale} />

      {/* 买家评价 */}
      <Reviews currentLocale={currentLocale} />

      {/* 尺码 / 物流 / 退换 FAQ */}
      <ShopFAQ currentLocale={currentLocale} />

      {/* 订阅 */}
      <Newsletter currentLocale={currentLocale} />
    </ShopLayout>
  );
}
