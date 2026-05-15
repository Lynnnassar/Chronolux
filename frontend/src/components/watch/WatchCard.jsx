import { Link } from "react-router-dom";
import config from "@/config";

const WatchCard = ({ watch, brandName }) => {
  const imageUrl = watch.thumbnail || watch.imageUrl || "";

  return (
    <Link
      to={`/watches/${watch._id}`}
      className="group bg-white rounded-3xl border border-black/5 overflow-hidden shadow-[0_20px_60px_-50px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="aspect-4/5 bg-[#f2ede6] flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={`${config.IMAGE_BASE_URL}${imageUrl}`}
            alt={watch.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-3/4 h-3/4 rounded-full border border-black/10 bg-white/80" />
        )}
      </div>
      <div className="p-6 space-y-3">
        <p className="text-[10px] uppercase tracking-[0.35em] text-black/50">
          {brandName || "ChronoLux"}
        </p>
        <h3 className="text-xl font-serif text-black leading-tight">
          {watch.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-black/70">
            ${watch.price?.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            {watch.stock > 0 ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WatchCard;
