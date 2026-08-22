import Image from "next/image";
import Link from "next/link";
import { getText, type Locale } from "@/lib/i18n";
import { CATEGORIES, t } from "@/constants/products";

export function CategoryTiles({ currentLocale }: { currentLocale: Locale }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
          {getText("shop.categories.title", currentLocale)}
        </h2>
        <p className="text-sm text-neutral-500">
          {getText("shop.categories.subtitle", currentLocale)}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/${currentLocale}/shop?category=${category.id}`}
            className="group relative aspect-[3/4] overflow-hidden bg-neutral-100"
          >
            <Image
              src={category.image}
              alt={t(category.name, currentLocale)}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                {t(category.tagline, currentLocale)}
              </p>
              <h3 className="mt-2 text-xl font-light tracking-wide text-white">
                {t(category.name, currentLocale)}
              </h3>
              <span className="mt-3 inline-block border-b border-white/50 pb-0.5 text-[11px] uppercase tracking-[0.18em] text-white transition-colors group-hover:border-white">
                {getText("shop.categories.cta", currentLocale)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryTiles;
