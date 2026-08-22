import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { getFeaturedProducts } from "@/constants/products";
import ProductCard from "@/components/shop/ProductCard";

export function FeaturedProducts({ currentLocale }: { currentLocale: Locale }) {
  const products = getFeaturedProducts(8);

  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
              {getText("shop.featured.title", currentLocale)}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {getText("shop.featured.subtitle", currentLocale)}
            </p>
          </div>
          <Link
            href={`/${currentLocale}/shop`}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-900"
          >
            <span className="border-b border-neutral-900 pb-0.5">
              {getText("shop.featured.viewAll", currentLocale)}
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              currentLocale={currentLocale}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
