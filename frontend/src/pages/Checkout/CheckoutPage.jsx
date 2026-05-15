import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { placeOrder } from "@/services/api/orders";

const CheckoutPage = () => {
  const { items, totals, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setIsSubmitting(true);
      await placeOrder(
        items.map((item) => ({
          watchId: item.watch._id,
          quantity: item.quantity,
        })),
      );
      clearCart();
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-black/40">
          Checkout
        </p>
        <h1 className="text-4xl font-serif">Confirm your order</h1>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white border border-black/5 rounded-3xl p-8"
        >
          <p className="text-sm text-black/60">Shipping details</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="border border-black/10 rounded-xl px-4 py-3"
              placeholder="First name"
            />
            <input
              className="border border-black/10 rounded-xl px-4 py-3"
              placeholder="Last name"
            />
          </div>
          <input
            className="border border-black/10 rounded-xl px-4 py-3 w-full"
            placeholder="Address"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="border border-black/10 rounded-xl px-4 py-3"
              placeholder="City"
            />
            <input
              className="border border-black/10 rounded-xl px-4 py-3"
              placeholder="Postal code"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.4em] disabled:opacity-60"
          >
            {isSubmitting ? "Placing order..." : "Place order"}
          </button>
        </form>

        <div className="bg-[#111] text-white rounded-3xl p-8 h-fit">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Order summary
          </p>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.watch._id}
                className="flex justify-between text-sm"
              >
                <span>{item.watch.name}</span>
                <span>
                  ${(item.watch.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 flex justify-between text-sm">
            <span>Total</span>
            <span>${totals.subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
