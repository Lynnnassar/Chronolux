import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBrands } from "@/services/api/brands";
import config from "@/config";

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
            className="bg-white border border-black/5 rounded-3xl p-6 hover:-translate-y-1 transition-transform flex gap-4 items-center"
          >
            <div className="w-20 h-20 flex-shrink-0">
              {brand.logo || brand.imageUrl ? (
                <img
                  src={`${config.IMAGE_BASE_URL}${brand.logo || brand.imageUrl}`}
                  alt={`${brand.name} logo`}
                  className="w-20 h-20 object-contain"
                />
              ) : (
                <div className="w-20 h-20 bg-black/5 rounded-md flex items-center justify-center text-xs text-black/40">
                  No Logo
                </div>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                {brand.country}
              </p>
              <h2 className="text-2xl font-serif mt-2">{brand.name}</h2>
              <p className="text-sm text-black/60 mt-3">{brand.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
