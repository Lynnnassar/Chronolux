import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getWatchById } from "@/services/api/watches";
import { getBrands } from "@/services/api/brands";
import config from "@/config";
import { useCart } from "@/hooks/useCart";

const ProductPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: watch, isLoading } = useQuery({
    queryKey: ["watch", id],
    queryFn: () => getWatchById(id),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const brandName = useMemo(() => {
    const map = new Map(brands.map((brand) => [brand._id, brand.name]));
    return map.get(watch?.brand);
  }, [brands, watch]);

  if (isLoading || !watch) {
    return <div className="max-w-5xl mx-auto px-6 py-24">Loading...</div>;
  }

  const imageUrl = watch.thumbnail || watch.imageUrl || "";

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-[#efe7dd] rounded-[2.5rem] overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={`${config.IMAGE_BASE_URL}${imageUrl}`}
            alt={watch.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-80 h-80 rounded-full border border-black/10 bg-white/80" />
        )}
      </div>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            {brandName || "ChronoLux"}
          </p>
          <h1 className="text-4xl font-serif text-black mt-2">{watch.name}</h1>
          <p className="text-lg text-black/70 mt-4">
            ${watch.price?.toLocaleString()}
          </p>
        </div>
        <p className="text-sm text-black/60 leading-relaxed">
          {watch.description ||
            "A refined expression of Swiss heritage and modern craft."}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 rounded-full border border-black/10"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-10 h-10 rounded-full border border-black/10"
          >
            +
          </button>
        </div>
        <button
          onClick={() => addItem(watch, quantity)}
          className="w-full px-8 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.4em]"
        >
          Add to cart
        </button>
        <div className="grid grid-cols-2 gap-4 text-sm text-black/60">
          <div>
            <p className="uppercase text-[10px] tracking-[0.3em] text-black/40">
              Movement
            </p>
            <p>{watch.specifications?.movement || "Automatic"}</p>
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-[0.3em] text-black/40">
              Case
            </p>
            <p>{watch.specifications?.caseMaterial || "Stainless Steel"}</p>
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-[0.3em] text-black/40">
              Diameter
            </p>
            <p>{watch.specifications?.caseDiameter || "40mm"}</p>
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-[0.3em] text-black/40">
              Water
            </p>
            <p>{watch.specifications?.waterResistance || "100m"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
