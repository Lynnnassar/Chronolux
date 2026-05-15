import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBrands } from "@/services/api/brands";

const BrandsPage = () => {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-black/40">
          Maisons
        </p>
        <h1 className="text-4xl font-serif">Crafted by heritage</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            to={`/shop?brand=${brand._id}`}
            className="bg-white border border-black/5 rounded-3xl p-6 hover:-translate-y-1 transition-transform"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              {brand.country}
            </p>
            <h2 className="text-2xl font-serif mt-2">{brand.name}</h2>
            <p className="text-sm text-black/60 mt-3">{brand.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
