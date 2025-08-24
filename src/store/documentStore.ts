import { create } from "zustand";
import { ItemState } from "../types/document";

type Store = {
  items: Record<number, ItemState>;
  initItem: (id: number, title: string) => void;
  updateItem: (id: number, patch: Partial<ItemState>) => void;
  getAll: () => ItemState[]; // 전체 아이템 (id 포함)
};

// 초기값
const makeDefault = (id: number, title = ""): ItemState => ({
  id,
  title,
  userAnswer: "",
  aiAnswer: "",
  qa: [],
});

export const useDocStore = create<Store>((set, get) => ({
  items: {},

  initItem: (id, title) =>
    set((s) => {
      if (s.items[id]) return s;
      return { items: { ...s.items, [id]: makeDefault(id, title) } };
    }),

  updateItem: (id, patch) =>
    set((s) => {
      const prev = s.items[id] ?? makeDefault(id);
      const next: ItemState = { ...prev, ...patch, id };
      return { items: { ...s.items, [id]: next } };
    }),

  getAll: () => {
    const items = get().items;
    return Object.keys(items)
      .map((k) => items[Number(k)])
      .filter((x): x is ItemState => Boolean(x))
      .sort((a, b) => a.id - b.id);
  },
}));
