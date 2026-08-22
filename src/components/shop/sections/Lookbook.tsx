import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { getProductBySlug, t } from "@/constants/products";

const LOOK_IMAGES = [
  // 编辑大片
  "https://images.unsplash.com/photo-1596993100471-c3905dafa78e?auto=format&fit=crop&w=1200&q=80",
  // 针织衫挂架
  "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1200&q=80",
  // 门店挂架
  "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=80",
];

/** 画册里出现的单品，点击可直达详情页 */
const LOOK_SLUGS = [
  "wool-blend-overcoat",
  "fringed-knit-wrap",
  "selvedge-denim-jeans",
  "leather-lace-up-boots",
];

export function Lookbook({ currentLocale }: { currentLocale: Locale }) {
  const looks = LOOK_SLUGS.map(getProductBySlug).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section
      id="lookbook"
      className="scroll-mt-24 border-t border-neutral-200 bg-neutral-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
              {getText("shop.hero.eyebrow", currentLocale)}
            </p>
            <h2 className="mt-5 text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              {getText("shop.lookbook.title", currentLocale)}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {getText("shop.lookbook.subtitle", currentLocale)}
            </p>

            <ul className="mt-8 space-y-3 border-t border-white/15 pt-8">
              {looks.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${currentLocale}/product/${product.slug}`}
                    className="group flex items-center justify-between gap-4 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span>{t(product.name, currentLocale)}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/${currentLocale}/shop`}
              className="mt-8 inline-block border-b border-white pb-0.5 text-xs uppercase tracking-[0.18em]"
            >
              {getText("shop.lookbook.cta", currentLocale)}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 sm:row-span-2 sm:aspect-auto sm:min-h-[560px]">
              <Image
                src={LOOK_IMAGES[0]}
                alt={getText("shop.lookbook.title", currentLocale)}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            {LOOK_IMAGES.slice(1).map((src, index) => (
              <div
                key={src}
                className="relative aspect-[4/5] overflow-hidden bg-neutral-800"
              >
                <Image
                  src={src}
                  alt={`${getText("shop.lookbook.title", currentLocale)} ${index + 2}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Lookbook;
