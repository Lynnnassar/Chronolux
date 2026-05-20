import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getWatches } from "@/services/api/watches";
import { getBrands } from "@/services/api/brands";
import { getCategories } from "@/services/api/categories";
import { getCollections } from "@/services/api/collections";
import WatchCard from "@/components/watch/WatchCard";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("q") || "");

  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const collection = searchParams.get("collection") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const { data: watches = [], isLoading } = useQuery({
    queryKey: ["watches", brand, category, collection, minPrice, maxPrice],
    queryFn: () =>
      getWatches({
        brand: brand || undefined,
        category: category || undefined,
        collection: collection || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      }),
  });

  const brandMap = useMemo(
    () => new Map(brands.map((item) => [item._id, item.name])),
    [brands],
  );

  const filtered = watches.filter((watch) =>
    watch.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Shop
          </p>
          <h1 className="text-4xl font-serif text-black">The collection</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search timepieces"
            className="w-56 rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          />
          <select
            value={brand}
            onChange={(event) => updateParams({ brand: event.target.value })}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          >
            <option value="">All brands</option>
            {brands.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={collection}
            onChange={(event) => updateParams({ collection: event.target.value })}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          >
            <option value="">All collections</option>
            {collections.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(event) => updateParams({ category: event.target.value })}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            value={minPrice}
            onChange={(event) => updateParams({ minPrice: event.target.value })}
            placeholder="Min"
            className="w-24 rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          />
          <input
            value={maxPrice}
            onChange={(event) => updateParams({ maxPrice: event.target.value })}
            placeholder="Max"
            className="w-24 rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-96 bg-white rounded-3xl animate-pulse"
            />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-black/50">
            No watches match your filters.
          </div>
        ) : (
          filtered.map((watch) => (
            <WatchCard
              key={watch._id}
              watch={watch}
              brandName={brandMap.get(watch.brand)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ShopPage;
