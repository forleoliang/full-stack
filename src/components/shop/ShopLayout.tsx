import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";
import CartDrawer from "@/components/shop/CartDrawer";
import type { Locale } from "@/lib/i18n";

/**
 * 电商站通用布局：公告条 + 顶部导航 + 购物车抽屉 + 页脚
 * 整体固定浅色底，不跟随系统深色模式。
 */
function ShopLayout({
  children,
  currentLocale,
}: {
  children: React.ReactNode;
  currentLocale: Locale;
}) {
  return (
    // 注意：这里不能加 overflow-x-hidden，否则 header 的 sticky 会失效
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <ShopHeader currentLocale={currentLocale} />
      <main className="flex-1">{children}</main>
      <ShopFooter currentLocale={currentLocale} />
      <CartDrawer currentLocale={currentLocale} />
    </div>
  );
}

export default ShopLayout;
