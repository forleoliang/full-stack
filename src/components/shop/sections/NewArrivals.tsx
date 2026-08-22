import { getText, type Locale } from "@/lib/i18n";
import { getNewArrivals } from "@/constants/products";
import ProductCard from "@/components/shop/ProductCard";

export function NewArrivals({ currentLocale }: { currentLocale: Locale }) {
  const products = getNewArrivals(4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
          {getText("shop.new.title", currentLocale)}
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          {getText("shop.new.subtitle", currentLocale)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            currentLocale={currentLocale}
          />
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
