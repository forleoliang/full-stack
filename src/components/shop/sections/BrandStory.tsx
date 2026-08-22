import Image from "next/image";
import { getText, type Locale } from "@/lib/i18n";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80";

const POINTS = [
  { titleKey: "shop.story.point1.title", bodyKey: "shop.story.point1.body" },
  { titleKey: "shop.story.point2.title", bodyKey: "shop.story.point2.body" },
  { titleKey: "shop.story.point3.title", bodyKey: "shop.story.point3.body" },
];

export function BrandStory({ currentLocale }: { currentLocale: Locale }) {
  return (
    <section id="story" className="scroll-mt-24 border-t border-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 lg:aspect-auto lg:min-h-[520px]">
          <Image
            src={STORY_IMAGE}
            alt={getText("shop.story.title", currentLocale)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-light leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            {getText("shop.story.title", currentLocale)}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {getText("shop.story.body", currentLocale)}
          </p>

          <dl className="mt-12 divide-y divide-neutral-200 border-t border-neutral-200">
            {POINTS.map((point, index) => (
              <div key={point.titleKey} className="flex gap-6 py-6">
                <span className="text-xs tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="text-sm font-medium text-neutral-900">
                    {getText(point.titleKey, currentLocale)}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {getText(point.bodyKey, currentLocale)}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
