"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isCheckoutOpen: boolean;
  checkoutItems: CartItem[];
  openCheckout: (customItems?: CartItem[]) => void;
  closeCheckout: () => void;
  toastMessage: string | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dingin_in_cart_v1";

// Event listener subscription for external store sync
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("cart_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart_updated", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(CART_STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customCheckoutItems, setCustomCheckoutItems] = useState<CartItem[] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize state with localStorage via useSyncExternalStore (React 18 & 19 recommended pattern)
  const rawCart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const items = useMemo<CartItem[]>(() => {
    try {
      const parsed = JSON.parse(rawCart);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [rawCart]);

  const persistItems = useCallback((newItems: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      window.dispatchEvent(new Event("cart_updated"));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
      const currentItems = [...items];
      const existingIndex = currentItems.findIndex(
        (i) => i.variantId === newItem.variantId
      );
      if (existingIndex > -1) {
        currentItems[existingIndex].quantity += quantity;
      } else {
        currentItems.push({ ...newItem, quantity });
      }
      persistItems(currentItems);
      showToast(`"${newItem.productName}" ditambahkan ke keranjang`);
    },
    [items, persistItems, showToast]
  );

  const removeItem = useCallback(
    (variantId: string) => {
      const filtered = items.filter((i) => i.variantId !== variantId);
      persistItems(filtered);
    },
    [items, persistItems]
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(variantId);
        return;
      }
      const updated = items.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      );
      persistItems(updated);
    },
    [items, persistItems, removeItem]
  );

  const clearCart = useCallback(() => {
    persistItems([]);
  }, [persistItems]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const openCheckout = useCallback(
    (customItems?: CartItem[]) => {
      if (customItems && customItems.length > 0) {
        setCustomCheckoutItems(customItems);
        setIsDrawerOpen(false);
        setIsCheckoutOpen(true);
        return;
      }

      if (items.length === 0) {
        showToast("Keranjang Anda masih kosong. Pilih produk terlebih dahulu.");
        return;
      }

      setCustomCheckoutItems(null);
      setIsDrawerOpen(false);
      setIsCheckoutOpen(true);
    },
    [items, showToast]
  );

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setCustomCheckoutItems(null);
  }, []);

  const activeCheckoutItems = useMemo(() => {
    if (customCheckoutItems && customCheckoutItems.length > 0) {
      return customCheckoutItems;
    }
    return items;
  }, [customCheckoutItems, items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        isCheckoutOpen,
        checkoutItems: activeCheckoutItems,
        openCheckout,
        closeCheckout,
        toastMessage,
        hideToast: () => setToastMessage(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
