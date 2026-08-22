import Link from "next/link";
import { getText, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

/** 页脚只列出站内真实存在的路由，避免死链 */
function buildColumns(locale: Locale) {
  return [
    {
      titleKey: "shop.footer.shop",
      links: [
        { labelKey: "shop.nav.women", href: `/${locale}/shop?category=women` },
        { labelKey: "shop.nav.men", href: `/${locale}/shop?category=men` },
        {
          labelKey: "shop.nav.accessories",
          href: `/${locale}/shop?category=accessories`,
        },
        { labelKey: "shop.nav.all", href: `/${locale}/shop` },
      ],
    },
    {
      titleKey: "shop.footer.help",
      links: [
        { labelKey: "shop.footer.sizeGuide", href: `/${locale}/faq` },
        { labelKey: "shop.footer.shipping", href: `/${locale}/faq` },
        { labelKey: "shop.footer.returns", href: `/${locale}/faq` },
        { labelKey: "shop.footer.faq", href: `/${locale}/faq` },
      ],
    },
    {
      titleKey: "shop.footer.about",
      links: [
        { labelKey: "shop.footer.story", href: `/${locale}#story` },
        { labelKey: "shop.footer.materials", href: `/${locale}#story` },
        { labelKey: "shop.footer.journal", href: `/${locale}/blog` },
        { labelKey: "shop.footer.contact", href: `/${locale}/service` },
      ],
    },
  ];
}

export function ShopFooter({ currentLocale }: { currentLocale: Locale }) {
  const columns = buildColumns(currentLocale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-lg font-medium tracking-[0.35em] text-neutral-900">
              {getText("shop.brand", currentLocale)}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              {getText("shop.brand.tagline", currentLocale)}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.titleKey}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
                {getText(column.titleKey, currentLocale)}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.titleKey}-${link.labelKey}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {getText(link.labelKey, currentLocale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 语言切换 */}
        <div className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-100 pt-8">
          {(Object.keys(SUPPORTED_LOCALES) as Locale[]).map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={
                locale === currentLocale
                  ? "text-xs text-neutral-900"
                  : "text-xs text-neutral-400 transition-colors hover:text-neutral-900"
              }
            >
              {SUPPORTED_LOCALES[locale]}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            © {year} {getText("shop.brand", currentLocale)}.{" "}
            {getText("shop.footer.rights", currentLocale)}
          </p>
          <div className="flex gap-6">
            <Link
              href={`/${currentLocale}/privacy`}
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-900"
            >
              {getText("shop.footer.privacy", currentLocale)}
            </Link>
            <Link
              href={`/${currentLocale}/service`}
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-900"
            >
              {getText("shop.footer.terms", currentLocale)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShopFooter;
