import { create } from "zustand";

import type { FilterState } from "@/shared/types/filter";

type FilterStore = FilterState & {
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: number | null) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  reset: () => void;
};

const initialState: FilterState = {
  title: "",
  categoryId: null,
  minPrice: "",
  maxPrice: "",
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  reset: () => set(initialState),
}));

