import config from "@/config";

const CartItemRow = ({ item, onRemove, onUpdate }) => {
  const imageUrl = item.watch.thumbnail || item.watch.imageUrl || "";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-black/5 pb-6">
      <div className="w-28 h-28 bg-[#f2ede6] rounded-2xl flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={`${config.IMAGE_BASE_URL}${imageUrl}`}
            alt={item.watch.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full border border-black/10 bg-white/80" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-black/40">
          {item.watch.name}
        </p>
        <p className="text-lg font-serif text-black">
          ${item.watch.price?.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdate(item.watch._id, item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-black/10 text-black"
        >
          -
        </button>
        <span className="text-sm min-w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdate(item.watch._id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-black/10 text-black"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <button
          onClick={() => onRemove(item.watch._id)}
          className="text-xs uppercase tracking-[0.3em] text-black/50 hover:text-black"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;
