import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWatches } from "@/services/api/watches";
import { getBrands } from "@/services/api/brands";
import WatchCard from "@/components/watch/WatchCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: watches = [] } = useQuery({
    queryKey: ["home-watches"],
    queryFn: () => getWatches(),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["home-brands"],
    queryFn: getBrands,
  });

  const brandMap = useMemo(
    () => new Map(brands.map((brand) => [brand._id, brand.name])),
    [brands],
  );

  const featured = watches.slice(0, 6);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-[#0c0b09] text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-40 h-80 w-80 rounded-full bg-[#bda173] opacity-30 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#4b2e1b] opacity-40 blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.6em] text-white/60">
              ChronoLux Atelier
            </p>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
              Heritage craftsmanship, distilled for today.
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Discover limited collections of Swiss watchmaking with modern
              restraint. Every ChronoLux piece is curated for collectors who
              value quiet confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="px-8 py-3 rounded-full bg-white text-black text-xs uppercase tracking-[0.4em]"
              >
                Explore Collection
              </Link>
              <Link
                to="/brands"
                className="px-8 py-3 rounded-full border border-white/30 text-white text-xs uppercase tracking-[0.4em]"
              >
                Meet the maisons
              </Link>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Editor selection
            </p>
            <div className="mt-8 space-y-6">
              {featured.slice(0, 3).map((watch) => (
                <div
                  key={watch._id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                      {brandMap.get(watch.brand) || "Maison"}
                    </p>
                    <p className="text-lg font-serif">{watch.name}</p>
                  </div>
                  <Link
                    to={`/watches/${watch._id}`}
                    className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">
              Curated
            </p>
            <h2 className="text-4xl font-serif text-black">
              Featured timepieces
            </h2>
          </div>
          <p className="text-sm text-black/60 max-w-md">
            Each piece is authenticated, serviced, and ready for a lifetime of
            wear.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((watch) => (
            <WatchCard
              key={watch._id}
              watch={watch}
              brandName={brandMap.get(watch.brand)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
