import { Plus } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";

const FAQS = [
  { questionKey: "shop.faq.q1", answerKey: "shop.faq.a1" },
  { questionKey: "shop.faq.q2", answerKey: "shop.faq.a2" },
  { questionKey: "shop.faq.q3", answerKey: "shop.faq.a3" },
  { questionKey: "shop.faq.q4", answerKey: "shop.faq.a4" },
  { questionKey: "shop.faq.q5", answerKey: "shop.faq.a5" },
  { questionKey: "shop.faq.q6", answerKey: "shop.faq.a6" },
];

export function ShopFAQ({ currentLocale }: { currentLocale: Locale }) {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-neutral-200">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
            {getText("shop.faq.title", currentLocale)}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {getText("shop.faq.subtitle", currentLocale)}
          </p>
        </div>

        <div className="border-t border-neutral-200">
          {FAQS.map((faq) => (
            <details
              key={faq.questionKey}
              className="group border-b border-neutral-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-sm text-neutral-900 [&::-webkit-details-marker]:hidden">
                {getText(faq.questionKey, currentLocale)}
                <Plus
                  className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="pb-6 pr-10 text-sm leading-relaxed text-neutral-500">
                {getText(faq.answerKey, currentLocale)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopFAQ;
