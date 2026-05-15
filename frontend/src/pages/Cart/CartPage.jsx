import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItemRow from "@/components/cart/CartItemRow";

const CartPage = () => {
  const { items, totals, removeItem, updateQuantity } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Cart
          </p>
          <h1 className="text-4xl font-serif">Your selection</h1>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="text-black/60">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.watch._id}
                item={item}
                onRemove={removeItem}
                onUpdate={updateQuantity}
              />
            ))
          )}
        </div>
        <div className="bg-white rounded-3xl border border-black/5 p-8 h-fit">
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Summary
          </p>
          <div className="mt-6 space-y-3 text-sm text-black/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totals.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-8 block w-full text-center px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.4em]"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
