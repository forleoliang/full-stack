import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { getAllProducts } from "@/constants/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80";

export function Hero({ currentLocale }: { currentLocale: Locale }) {
  const stats = [
    { value: "8", labelKey: "shop.hero.stat.materials" },
    { value: "30", labelKey: "shop.hero.stat.returns" },
    {
      value: String(getAllProducts().length),
      labelKey: "shop.hero.stat.pieces",
    },
  ];

  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-neutral-100">
        <Image
          src={HERO_IMAGE}
          alt={getText("shop.hero.title", currentLocale)}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* 双层压暗：底部保证文案对比度，左侧兜住浅色主体的图 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
              {getText("shop.hero.eyebrow", currentLocale)}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {getText("shop.hero.title", currentLocale)}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {getText("shop.hero.subtitle", currentLocale)}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${currentLocale}/shop`}
                className="group inline-flex items-center justify-center gap-2 bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                {getText("shop.hero.cta", currentLocale)}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${currentLocale}#lookbook`}
                className="inline-flex items-center justify-center border border-white/40 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {getText("shop.hero.cta.secondary", currentLocale)}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 数据条 */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-neutral-200 px-4 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="px-2 py-7 text-center">
              <p className="text-2xl font-light tabular-nums text-neutral-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                {getText(stat.labelKey, currentLocale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
