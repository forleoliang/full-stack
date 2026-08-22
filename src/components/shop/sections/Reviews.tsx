import Link from "next/link";
import { Star } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";
import { getProductBySlug, t, type LocalizedText } from "@/constants/products";

interface Review {
  slug: string;
  author: string;
  /** 身高 / 所购尺码，服装电商评价里最有用的信息 */
  fit: LocalizedText;
  rating: number;
  body: LocalizedText;
}

const REVIEWS: Review[] = [
  {
    slug: "fringed-knit-wrap",
    author: "Lena W.",
    fit: { en: "168cm · Size S", zh: "168cm · S 码" },
    rating: 5,
    body: {
      en: "Third winter with this one and it still has no pilling. I wear it over shirts and under the overcoat and it never looks bulky.",
      zh: "穿到第三个冬天了，还是不起球。里面套衬衫、外面罩大衣都不显臃肿。",
    },
  },
  {
    slug: "selvedge-denim-jeans",
    author: "Marcus T.",
    fit: { en: "182cm · Size 32", zh: "182cm · 32 码" },
    rating: 5,
    body: {
      en: "Stiff for the first two weeks, exactly as described. Six months in the fades are honest and the chain-stitch hem has held.",
      zh: "前两周确实硬，跟描述完全一致。半年下来落色很自然，链条缝的裤脚一点没散。",
    },
  },
  {
    slug: "bias-cut-maxi-dress",
    author: "Ayaka M.",
    fit: { en: "172cm · Size S", zh: "172cm · S 码" },
    rating: 4,
    body: {
      en: "The bias cut is genuinely flattering and the crepe is heavy enough not to cling. I sized down and it was the right call.",
      zh: "斜裁的垂坠感很好，绉纱够厚不贴身。我选小了一码，事实证明是对的。",
    },
  },
  {
    slug: "wool-blend-overcoat",
    author: "Sofia R.",
    fit: { en: "175cm · Size M", zh: "175cm · M 码" },
    rating: 5,
    body: {
      en: "Warm without the weight of a full wool coat. The sleeves are long enough, which is rare for me.",
      zh: "比纯羊毛大衣轻，但一样暖。袖长够，这点对我来说很难得。",
    },
  },
  {
    slug: "washed-cotton-shirt",
    author: "Daniel K.",
    fit: { en: "179cm · Size M", zh: "179cm · M 码" },
    rating: 5,
    body: {
      en: "Softened up after two washes. Wears well untucked and the collar stays put without stays.",
      zh: "洗两次以后就软了。下摆不扎进裤子也很好看，领子不用领撑也立得住。",
    },
  },
  {
    slug: "canvas-backpack",
    author: "Priya S.",
    fit: { en: "Daily commute", zh: "日常通勤" },
    rating: 5,
    body: {
      en: "Heavier than a nylon pack, but it holds its shape fully loaded and the leather trim has started to patina nicely.",
      zh: "比尼龙包重一些，但装满了也不塌，皮革包边开始有包浆了。",
    },
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "h-3 w-3 fill-neutral-900 text-neutral-900"
              : "h-3 w-3 text-neutral-300"
          }
        />
      ))}
    </div>
  );
}

export function Reviews({ currentLocale }: { currentLocale: Locale }) {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
            {getText("shop.reviews.title", currentLocale)}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {getText("shop.reviews.subtitle", currentLocale)}
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => {
            const product = getProductBySlug(review.slug);
            return (
              <figure
                key={`${review.slug}-${review.author}`}
                className="flex flex-col border-t border-neutral-200 pt-6"
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
                  {t(review.body, currentLocale)}
                </blockquote>
                <figcaption className="mt-5 space-y-1">
                  <p className="text-sm text-neutral-900">{review.author}</p>
                  <p className="text-xs text-neutral-400">
                    {getText("shop.reviews.verified", currentLocale)} ·{" "}
                    {t(review.fit, currentLocale)}
                  </p>
                  {product && (
                    <Link
                      href={`/${currentLocale}/product/${product.slug}`}
                      className="inline-block pt-1 text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
                    >
                      {t(product.name, currentLocale)}
                    </Link>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
