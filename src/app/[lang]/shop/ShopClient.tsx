"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import {
  CATEGORIES,
  formatPrice,
  t,
  type CategoryId,
  type Product,
  type ProductColor,
} from "@/constants/products";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/utils";

type SortKey = "featured" | "newest" | "priceAsc" | "priceDesc" | "rating";

const SORT_OPTIONS: Array<{ key: SortKey; labelKey: string }> = [
  { key: "featured", labelKey: "shop.sort.featured" },
  { key: "newest", labelKey: "shop.sort.newest" },
  { key: "priceAsc", labelKey: "shop.sort.priceAsc" },
  { key: "priceDesc", labelKey: "shop.sort.priceDesc" },
  { key: "rating", labelKey: "shop.sort.rating" },
];

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.arrivalOrder - a.arrivalOrder);
    case "priceAsc":
      return sorted.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      // 精选优先，其余按上架顺序
      return sorted.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          b.arrivalOrder - a.arrivalOrder,
      );
  }
}

export interface ShopClientProps {
  products: Product[];
  colors: ProductColor[];
  sizes: string[];
  maxPrice: number;
  currentLocale: Locale;
  initialCategory: CategoryId | null;
}

export function ShopClient({
  products,
  colors,
  sizes,
  maxPrice,
  currentLocale,
  initialCategory,
}: ShopClientProps) {
  const [category, setCategory] = useState<CategoryId | null>(initialCategory);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [priceCeiling, setPriceCeiling] = useState(maxPrice);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (
    value: string,
    list: string[],
    setList: (next: string[]) => void,
  ) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (inStockOnly && !product.inStock) return false;
      if (product.price > priceCeiling) return false;
      if (
        activeSizes.length > 0 &&
        !product.sizes.some((size) => activeSizes.includes(size))
      )
        return false;
      if (
        activeColors.length > 0 &&
        !product.colors.some((color) => activeColors.includes(color.id))
      )
        return false;
      return true;
    });
    return sortProducts(filtered, sort);
  }, [
    products,
    category,
    inStockOnly,
    priceCeiling,
    activeSizes,
    activeColors,
    sort,
  ]);

  const hasFilters =
    category !== null ||
    activeSizes.length > 0 ||
    activeColors.length > 0 ||
    inStockOnly ||
    priceCeiling < maxPrice;

  const clearAll = () => {
    setCategory(null);
    setActiveSizes([]);
    setActiveColors([]);
    setPriceCeiling(maxPrice);
    setInStockOnly(false);
  };

  const filterPanel = (
    <div className="space-y-10">
      {/* 分类 */}
      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
          {getText("shop.filter.category", currentLocale)}
        </legend>
        <div className="mt-4 space-y-2.5">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "block text-sm transition-colors",
              category === null
                ? "text-neutral-900"
                : "text-neutral-500 hover:text-neutral-900",
            )}
          >
            {getText("shop.filter.all", currentLocale)}
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={cn(
                "block text-sm transition-colors",
                category === item.id
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900",
              )}
            >
              {t(item.name, currentLocale)}
            </button>
          ))}
        </div>
      </fieldset>

      {/* 尺码 */}
      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
          {getText("shop.filter.size", currentLocale)}
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={activeSizes.includes(size)}
              onClick={() => toggle(size, activeSizes, setActiveSizes)}
              className={cn(
                "border px-3 py-1.5 text-xs transition-colors",
                activeSizes.includes(size)
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 text-neutral-600 hover:border-neutral-900",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>

      {/* 颜色 */}
      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
          {getText("shop.filter.colour", currentLocale)}
        </legend>
        <div className="mt-4 space-y-2.5">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              aria-pressed={activeColors.includes(color.id)}
              onClick={() => toggle(color.id, activeColors, setActiveColors)}
              className="flex items-center gap-3"
            >
              <span
                className={cn(
                  "h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/15",
                  activeColors.includes(color.id) &&
                    "ring-2 ring-offset-2 ring-neutral-900",
                )}
                style={{ backgroundColor: color.hex }}
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  activeColors.includes(color.id)
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {t(color.name, currentLocale)}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 价格 */}
      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
          {getText("shop.filter.price", currentLocale)}
        </legend>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={5}
          value={priceCeiling}
          onChange={(event) => setPriceCeiling(Number(event.target.value))}
          className="mt-5 w-full accent-neutral-900"
          aria-label={getText("shop.filter.price", currentLocale)}
        />
        <div className="mt-2 flex justify-between text-xs tabular-nums text-neutral-500">
          <span>{formatPrice(0)}</span>
          <span className="text-neutral-900">{formatPrice(priceCeiling)}</span>
        </div>
      </fieldset>

      {/* 库存 */}
      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-900">
          {getText("shop.filter.availability", currentLocale)}
        </legend>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            className="h-4 w-4 accent-neutral-900"
          />
          {getText("shop.filter.inStockOnly", currentLocale)}
        </label>
      </fieldset>

      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs uppercase tracking-[0.15em] text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
        >
          {getText("shop.list.clearAll", currentLocale)}
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* 工具条 */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 py-4">
        <p className="text-xs tabular-nums text-neutral-500">
          {visible.length} {getText("shop.list.count", currentLocale)}
        </p>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-900 lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {getText("shop.list.filters", currentLocale)}
          </button>

          <label className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="hidden uppercase tracking-[0.15em] sm:inline">
              {getText("shop.sort.label", currentLocale)}
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="cursor-pointer border-0 bg-transparent py-1 text-xs text-neutral-900 focus:outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                  {getText(option.labelKey, currentLocale)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex gap-12 pt-10">
        {/* 桌面端筛选栏 */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        {/* 商品网格 */}
        <div className="min-w-0 flex-1">
          {visible.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm text-neutral-900">
                {getText("shop.list.empty.title", currentLocale)}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                {getText("shop.list.empty.body", currentLocale)}
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 border-b border-neutral-900 pb-0.5 text-xs uppercase tracking-[0.15em] text-neutral-900"
              >
                {getText("shop.list.clearAll", currentLocale)}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
              {visible.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  currentLocale={currentLocale}
                  priority={index < 3}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 移动端筛选抽屉 */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-900">
                {getText("shop.list.filters", currentLocale)}
              </span>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label={getText("shop.nav.close", currentLocale)}
                className="text-neutral-400 hover:text-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">{filterPanel}</div>
            <div className="border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="w-full bg-neutral-900 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
              >
                {getText("shop.list.done", currentLocale)} ({visible.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopClient;
