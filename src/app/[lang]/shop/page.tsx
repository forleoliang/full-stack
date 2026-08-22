import { Metadata } from "next";
import { defaultMetadata } from "@/app/metadata";
import { getText, LOCALE_CODES, type Locale } from "@/lib/i18n";
import {
  CATEGORIES,
  getAllColors,
  getAllProducts,
  getAllSizes,
  t,
  type CategoryId,
} from "@/constants/products";
import ShopLayout from "@/components/shop/ShopLayout";
import ShopClient from "./ShopClient";

export const revalidate = 300;

export async function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

function resolveLocale(lang: string): Locale {
  return LOCALE_CODES.includes(lang as Locale) ? (lang as Locale) : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const base = (defaultMetadata[locale] || defaultMetadata.en) as Metadata;

  const title = `${getText("shop.list.title", locale)} — ${getText("shop.brand", locale)}`;
  const description = getText("shop.list.subtitle", locale);

  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description },
  };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category } = await searchParams;
  const currentLocale = resolveLocale(lang);

  const validCategory = CATEGORIES.some((item) => item.id === category)
    ? (category as CategoryId)
    : null;

  const activeCategory = validCategory
    ? CATEGORIES.find((item) => item.id === validCategory)
    : undefined;

  const products = getAllProducts();
  const maxPrice = Math.ceil(
    Math.max(...products.map((product) => product.price)) / 10,
  ) * 10;

  return (
    <ShopLayout currentLocale={currentLocale}>
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
          {activeCategory
            ? t(activeCategory.name, currentLocale)
            : getText("shop.list.title", currentLocale)}
        </h1>
        <p className="mt-3 max-w-lg text-sm text-neutral-500">
          {activeCategory
            ? t(activeCategory.tagline, currentLocale)
            : getText("shop.list.subtitle", currentLocale)}
        </p>
      </div>

      <ShopClient
        // 切换分类时重置筛选状态
        key={validCategory ?? "all"}
        products={products}
        colors={getAllColors()}
        sizes={getAllSizes()}
        maxPrice={maxPrice}
        currentLocale={currentLocale}
        initialCategory={validCategory}
      />
    </ShopLayout>
  );
}
