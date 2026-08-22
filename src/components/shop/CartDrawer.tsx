"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getText, type Locale } from "@/lib/i18n";
import { formatPrice } from "@/constants/products";
import { selectSubtotal, useCartStore } from "@/stores/cart";

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer({ currentLocale }: { currentLocale: Locale }) {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectSubtotal);

  // 避免 localStorage 恢复前的水合不一致
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        showClose={false}
        className="flex w-full flex-col gap-0 border-l border-neutral-200 bg-white p-0 sm:max-w-md"
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-neutral-200 px-6 py-5 text-left">
          <SheetTitle className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-900">
            {getText("shop.cart.title", currentLocale)}
          </SheetTitle>
          <button
            type="button"
            onClick={closeCart}
            aria-label={getText("shop.nav.close", currentLocale)}
            className="text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        {!hydrated || items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-8 w-8 text-neutral-300" strokeWidth={1} />
            <p className="text-sm text-neutral-900">
              {getText("shop.cart.empty", currentLocale)}
            </p>
            <p className="text-xs text-neutral-500">
              {getText("shop.cart.emptyBody", currentLocale)}
            </p>
            <Link
              href={`/${currentLocale}/shop`}
              onClick={closeCart}
              className="mt-3 border-b border-neutral-900 pb-0.5 text-xs uppercase tracking-[0.15em] text-neutral-900"
            >
              {getText("shop.cart.continue", currentLocale)}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-neutral-200 overflow-y-auto px-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 py-5">
                  <Link
                    href={`/${currentLocale}/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-28 w-20 shrink-0 overflow-hidden bg-neutral-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-3">
                        <Link
                          href={`/${currentLocale}/product/${item.slug}`}
                          onClick={closeCart}
                          className="truncate text-sm text-neutral-900 hover:text-neutral-500"
                        >
                          {item.name}
                        </Link>
                        <span className="shrink-0 text-sm tabular-nums text-neutral-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.colorName} · {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          type="button"
                          aria-label="-"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="px-2 py-1.5 text-neutral-500 transition-colors hover:text-neutral-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-8 text-center text-xs tabular-nums text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="+"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="px-2 py-1.5 text-neutral-500 transition-colors hover:text-neutral-900"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900"
                      >
                        {getText("shop.cart.remove", currentLocale)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 px-6 py-5">
              <p className="mb-4 text-xs text-neutral-500">
                {remaining > 0
                  ? `${formatPrice(remaining)} ${getText("shop.cart.freeShippingAway", currentLocale)}`
                  : getText("shop.cart.freeShipping", currentLocale)}
              </p>

              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {getText("shop.cart.subtotal", currentLocale)}
                </span>
                <span className="text-lg tabular-nums text-neutral-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-400">
                {getText("shop.cart.shippingNote", currentLocale)}
              </p>

              {/* 结算流程尚未接入支付，先禁用 */}
              <button
                type="button"
                disabled
                className="mt-5 w-full bg-neutral-900 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {getText("shop.cart.checkout", currentLocale)}
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full py-2 text-xs uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {getText("shop.cart.continue", currentLocale)}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
