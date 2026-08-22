"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { selectItemCount, useCartStore } from "@/stores/cart";
import { cn } from "@/utils";

interface NavItem {
  labelKey: string;
  href: (locale: Locale) => string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "shop.nav.women", href: (l) => `/${l}/shop?category=women` },
  { labelKey: "shop.nav.men", href: (l) => `/${l}/shop?category=men` },
  {
    labelKey: "shop.nav.accessories",
    href: (l) => `/${l}/shop?category=accessories`,
  },
  { labelKey: "shop.nav.all", href: (l) => `/${l}/shop` },
  { labelKey: "shop.nav.lookbook", href: (l) => `/${l}#lookbook` },
];

export function ShopHeader({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore(selectItemCount);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* 顶部公告条 */}
      <div className="bg-neutral-900 py-2.5 text-center text-[11px] tracking-[0.1em] text-white">
        {getText("shop.announcement", currentLocale)}
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* 移动端菜单按钮 */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={getText("shop.nav.menu", currentLocale)}
            aria-expanded={mobileOpen}
            className="text-neutral-900 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          {/* 桌面端左侧导航 */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.labelKey}
                href={item.href(currentLocale)}
                className="text-xs uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {getText(item.labelKey, currentLocale)}
              </Link>
            ))}
          </nav>

          {/* 品牌名 */}
          <Link
            href={`/${currentLocale}`}
            className="text-lg font-medium tracking-[0.35em] text-neutral-900 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            {getText("shop.brand", currentLocale)}
          </Link>

          {/* 右侧 */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.slice(3).map((item) => (
                <Link
                  key={item.labelKey}
                  href={item.href(currentLocale)}
                  className="text-xs uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  {getText(item.labelKey, currentLocale)}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openCart}
              aria-label={getText("shop.nav.cart", currentLocale)}
              className="relative text-neutral-900 transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {hydrated && itemCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] tabular-nums text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 移动端下拉导航 */}
        <div
          className={cn(
            "overflow-hidden border-t border-neutral-200 transition-[max-height] duration-300 lg:hidden",
            mobileOpen ? "max-h-80" : "max-h-0 border-t-0",
          )}
        >
          <nav className="flex flex-col px-4 py-2 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href(currentLocale)}
                className="border-b border-neutral-100 py-3.5 text-sm uppercase tracking-[0.15em] text-neutral-700 last:border-b-0"
              >
                {getText(item.labelKey, currentLocale)}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default ShopHeader;
