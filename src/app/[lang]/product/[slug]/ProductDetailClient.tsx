"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Minus, Plus, Star } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { formatPrice, t, type Product } from "@/constants/products";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/utils";

/** 通用平铺尺码表（厘米），实际项目应按单品维护 */
const SIZE_CHART: Array<[string, number, number, number]> = [
  ["XS", 96, 76, 64],
  ["S", 101, 81, 66],
  ["M", 106, 86, 68],
  ["L", 112, 92, 70],
  ["XL", 118, 98, 72],
];

export function ProductDetailClient({
  product,
  currentLocale,
}: {
  product: Product;
  currentLocale: Locale;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const name = t(product.name, currentLocale);
  const color =
    product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const showSizeChart = SIZE_CHART.some(([s]) => product.sizes.includes(s));

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem(
      {
        slug: product.slug,
        name,
        image: product.images[0],
        price: product.price,
        colorId: color.id,
        colorName: t(color.name, currentLocale),
        size,
      },
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* 图片区 */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        {product.images.length > 1 && (
          <div className="flex gap-3 sm:flex-col">
            {product.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`${name} ${index + 1}`}
                className={cn(
                  "relative h-20 w-16 shrink-0 overflow-hidden bg-neutral-100 transition-opacity sm:h-24 sm:w-20",
                  activeImage === index
                    ? "ring-1 ring-neutral-900"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-neutral-100">
          <Image
            src={product.images[activeImage]}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* 信息区 */}
      <div className="lg:py-4">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          {t(product.collection, currentLocale)}
        </p>
        <h1 className="mt-3 text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
          {name}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-baseline gap-2.5">
            {product.compareAtPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-lg tabular-nums text-neutral-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <span className="h-3 w-px bg-neutral-200" />
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
            <span className="text-xs tabular-nums text-neutral-600">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-neutral-400">
              ({product.reviewCount} {getText("shop.product.reviews", currentLocale)})
            </span>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-neutral-600">
          {t(product.description, currentLocale)}
        </p>

        {/* 颜色 */}
        <div className="mt-9">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
              {getText("shop.product.colour", currentLocale)}
            </span>
            <span className="text-xs text-neutral-500">
              {t(color.name, currentLocale)}
            </span>
          </div>
          <div className="mt-3 flex gap-2.5">
            {product.colors.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setColorId(option.id)}
                aria-label={t(option.name, currentLocale)}
                aria-pressed={option.id === colorId}
                className={cn(
                  "h-7 w-7 rounded-full ring-1 ring-inset ring-black/15 transition-all",
                  option.id === colorId &&
                    "ring-1 ring-neutral-900 ring-offset-2",
                )}
                style={{ backgroundColor: option.hex }}
              />
            ))}
          </div>
        </div>

        {/* 尺码 */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
              {getText("shop.product.size", currentLocale)}
            </span>
            {showSizeChart && (
              <button
                type="button"
                onClick={() => setChartOpen((v) => !v)}
                className="text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
              >
                {getText("shop.product.sizeGuide", currentLocale)}
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setSizeError(false);
                }}
                aria-pressed={option === size}
                className={cn(
                  "min-w-14 border px-3 py-2.5 text-xs transition-colors",
                  option === size
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-900",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {sizeError && (
            <p className="mt-2 text-xs text-red-600">
              {getText("shop.product.selectSize", currentLocale)}
            </p>
          )}

          {chartOpen && showSizeChart && (
            <div className="mt-4 border border-neutral-200 p-4">
              <p className="text-xs text-neutral-500">
                {getText("shop.size.body", currentLocale)}
              </p>
              <table className="mt-3 w-full text-xs">
                <thead>
                  <tr className="text-left text-neutral-400">
                    <th className="pb-2 font-normal">
                      {getText("shop.size.col.size", currentLocale)}
                    </th>
                    <th className="pb-2 font-normal">
                      {getText("shop.size.col.chest", currentLocale)}
                    </th>
                    <th className="pb-2 font-normal">
                      {getText("shop.size.col.waist", currentLocale)}
                    </th>
                    <th className="pb-2 font-normal">
                      {getText("shop.size.col.length", currentLocale)}
                    </th>
                  </tr>
                </thead>
                <tbody className="tabular-nums text-neutral-700">
                  {SIZE_CHART.filter(([s]) => product.sizes.includes(s)).map(
                    ([label, chest, waist, length]) => (
                      <tr key={label} className="border-t border-neutral-100">
                        <td className="py-1.5">{label}</td>
                        <td className="py-1.5">{chest}</td>
                        <td className="py-1.5">{waist}</td>
                        <td className="py-1.5">{length}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 数量 + 加购 */}
        <div className="mt-8 flex items-stretch gap-3">
          <div className="flex items-center border border-neutral-300">
            <button
              type="button"
              aria-label="-"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-3 text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-9 text-center text-sm tabular-nums text-neutral-900">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="+"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="px-3 py-3 text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors",
              product.inStock
                ? "bg-neutral-900 text-white hover:bg-neutral-700"
                : "cursor-not-allowed bg-neutral-200 text-neutral-500",
            )}
          >
            {!product.inStock ? (
              getText("shop.product.soldOut", currentLocale)
            ) : justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                {getText("shop.product.added", currentLocale)}
              </>
            ) : (
              getText("shop.product.addToCart", currentLocale)
            )}
          </button>
        </div>

        {/* 详情折叠区 */}
        <div className="mt-10 border-t border-neutral-200">
          <details className="group border-b border-neutral-200" open>
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 [&::-webkit-details-marker]:hidden">
              {getText("shop.product.details", currentLocale)}
              <Plus className="h-3.5 w-3.5 text-neutral-400 transition-transform group-open:rotate-45" />
            </summary>
            <ul className="space-y-2 pb-5">
              {product.details.map((detail, index) => (
                <li key={index} className="text-sm text-neutral-600">
                  · {t(detail, currentLocale)}
                </li>
              ))}
            </ul>
          </details>

          <details className="group border-b border-neutral-200">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 [&::-webkit-details-marker]:hidden">
              {getText("shop.product.material", currentLocale)}
              <Plus className="h-3.5 w-3.5 text-neutral-400 transition-transform group-open:rotate-45" />
            </summary>
            <div className="space-y-2 pb-5 text-sm text-neutral-600">
              <p>{t(product.material, currentLocale)}</p>
              <p>
                {getText("shop.product.care", currentLocale)}:{" "}
                {t(product.care, currentLocale)}
              </p>
            </div>
          </details>

          <details className="group border-b border-neutral-200">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900 [&::-webkit-details-marker]:hidden">
              {getText("shop.product.shipping", currentLocale)}
              <Plus className="h-3.5 w-3.5 text-neutral-400 transition-transform group-open:rotate-45" />
            </summary>
            <p className="pb-5 text-sm text-neutral-600">
              {getText("shop.product.shippingBody", currentLocale)}
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailClient;
