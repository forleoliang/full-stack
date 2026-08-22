"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { getText, type Locale } from "@/lib/i18n";

export function Newsletter({ currentLocale }: { currentLocale: Locale }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO: 接入邮件服务（项目已集成 Resend，见 src/lib/resend.ts）
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="border-t border-neutral-200 bg-neutral-900 text-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
          {getText("shop.newsletter.title", currentLocale)}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          {getText("shop.newsletter.subtitle", currentLocale)}
        </p>

        {submitted ? (
          <p className="mt-10 inline-flex items-center gap-2 text-sm text-white">
            <Check className="h-4 w-4" />
            {getText("shop.newsletter.success", currentLocale)}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md items-center gap-0 border-b border-white/30 focus-within:border-white"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {getText("shop.newsletter.placeholder", currentLocale)}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={getText(
                "shop.newsletter.placeholder",
                currentLocale,
              )}
              className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="group flex items-center gap-2 py-3 pl-4 text-xs uppercase tracking-[0.18em] text-white"
            >
              {getText("shop.newsletter.button", currentLocale)}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-white/40">
          {getText("shop.newsletter.note", currentLocale)}
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
