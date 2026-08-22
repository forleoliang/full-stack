import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { defaultMetadata } from "@/app/metadata";
import { getText, LOCALE_CODES, type Locale } from "@/lib/i18n";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  t,
} from "@/constants/products";
import ShopLayout from "@/components/shop/ShopLayout";
import ProductCard from "@/components/shop/ProductCard";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 300;
// 商品来自静态数据，未收录的 slug 直接返回 404（避免 ISR 把 not-found 缓存成 200）
export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALE_CODES.flatMap((lang) =>
    getAllProducts().map((product) => ({ lang, slug: product.slug })),
  );
}

function resolveLocale(lang: string): Locale {
  return LOCALE_CODES.includes(lang as Locale) ? (lang as Locale) : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const product = getProductBySlug(slug);
  const base = (defaultMetadata[locale] || defaultMetadata.en) as Metadata;

  if (!product) return base;

  const title = `${t(product.name, locale)} — ${getText("shop.brand", locale)}`;
  const description = t(product.description, locale);

  return {
    ...base,
    title,
    description,
    openGraph: {
      ...base.openGraph,
      title,
      description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLocale = resolveLocale(lang);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  // 商品结构化数据，便于搜索引擎抓取价格与库存
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t(product.name, currentLocale),
    description: t(product.description, currentLocale),
    image: product.images,
    material: t(product.material, currentLocale),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <ShopLayout currentLocale={currentLocale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={`/${currentLocale}/shop`}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {getText("shop.product.back", currentLocale)}
        </Link>
      </div>

      <ProductDetailClient product={product} currentLocale={currentLocale} />

      {related.length > 0 && (
        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-xl font-light tracking-tight text-neutral-900">
              {getText("shop.product.related", currentLocale)}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.slug}
                  product={item}
                  currentLocale={currentLocale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </ShopLayout>
  );
}
