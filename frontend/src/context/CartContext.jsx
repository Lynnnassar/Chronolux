import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

const CART_KEY = "chronolux-cart";

const readCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  const addItem = (watch, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.watch._id === watch._id);
      const next = existing
        ? prev.map((item) =>
            item.watch._id === watch._id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...prev, { watch, quantity }];
      writeCart(next);
      return next;
    });
  };

  const updateQuantity = (watchId, quantity) => {
    setItems((prev) => {
      const next = prev
        .map((item) =>
          item.watch._id === watchId ? { ...item, quantity } : item,
        )
        .filter((item) => item.quantity > 0);
      writeCart(next);
      return next;
    });
  };

  const removeItem = (watchId) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.watch._id !== watchId);
      writeCart(next);
      return next;
    });
  };

  const clearCart = () => {
    writeCart([]);
    setItems([]);
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.watch.price * item.quantity,
      0,
    );
    return {
      subtotal,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, totals }}
    >
      {children}
    </CartContext.Provider>
  );
};
