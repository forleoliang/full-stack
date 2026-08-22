"use client";

/**
 * 购物车状态（zustand + localStorage 持久化）
 *
 * 目前只负责本地状态：加购、改数量、删除、清空。
 * 接入结算时，把 items 传给 /api/stripe/checkout 即可。
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  /** slug + 颜色 + 尺码 唯一确定一个 SKU */
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  colorId: string;
  colorName: string;
  size: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const makeCartKey = (slug: string, colorId: string, size: string) =>
  `${slug}::${colorId}::${size}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) =>
        set((state) => {
          const key = makeCartKey(item.slug, item.colorId, item.size);
          const existing = state.items.find((i) => i.key === key);
          const items = existing
            ? state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
              )
            : [...state.items, { ...item, key, quantity }];
          return { items, isOpen: true };
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "shop-cart",
      // isOpen 不需要持久化，刷新后购物车应该是关闭的
      partialize: (state) => ({ items: state.items }) as CartState,
    },
  ),
);

export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
