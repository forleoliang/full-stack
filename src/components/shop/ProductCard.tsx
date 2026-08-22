import Image from "next/image";
import Link from "next/link";
import { getText, type Locale } from "@/lib/i18n";
import { formatPrice, t, type Product } from "@/constants/products";
import { cn } from "@/utils";

const BADGE_KEY: Record<NonNullable<Product["badge"]>, string> = {
  new: "shop.product.new",
  bestseller: "shop.product.bestseller",
  sale: "shop.product.sale",
};

export interface ProductCardProps {
  product: Product;
  currentLocale: Locale;
  /** 首屏卡片设为 true，交给 Next 预加载 */
  priority?: boolean;
  className?: string;
}

/**
 * 商品卡片：鼠标悬停时淡出主图、露出第二张图（纯 CSS，无需 JS）
 */
export function ProductCard({
  product,
  currentLocale,
  priority = false,
  className,
}: ProductCardProps) {
  const name = t(product.name, currentLocale);
  const hasSecondImage = product.images.length > 1;

  return (
    <Link
      href={`/${currentLocale}/product/${product.slug}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            hasSecondImage
              ? "group-hover:opacity-0"
              : "group-hover:scale-105",
          )}
        />
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-900">
            {getText(BADGE_KEY[product.badge], currentLocale)}
          </span>
        )}

        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-neutral-900/85 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {getText("shop.product.soldOut", currentLocale)}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm text-neutral-900 transition-colors group-hover:text-neutral-500">
            {name}
          </h3>
          <div className="flex shrink-0 items-baseline gap-2">
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span
              className={cn(
                "text-sm tabular-nums",
                product.compareAtPrice ? "text-neutral-900" : "text-neutral-600",
              )}
            >
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-400">
          {t(product.collection, currentLocale)}
        </p>

        {/* 色卡 */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.slice(0, 5).map((color) => (
            <span
              key={color.id}
              title={t(color.name, currentLocale)}
              className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/15"
              style={{ backgroundColor: color.hex }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[10px] text-neutral-400">
              +{product.colors.length - 5}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
