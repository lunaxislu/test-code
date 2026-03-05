import type { StoreApi, UseBoundStore } from "zustand";
import { useCartStore } from "@/store/cart-store";
import { useFilterStore } from "@/store/filter-store";
import { useUserStore } from "@/store/user-store";

type ExtractState<S> = S extends { getState: () => infer X } ? X : never;
type StateOnly<T> = {
  [K in keyof T as T[K] extends (...args: unknown[]) => unknown
    ? never
    : K]: T[K];
};

const mockStore = <T extends object>(
  hook: UseBoundStore<StoreApi<T>>,
  patch: Partial<StateOnly<T>>,
) => {
  hook.setState({ ...hook.getState(), ...patch }, true);
};

export const mockUseUserStore = (
  state: Partial<StateOnly<ExtractState<typeof useUserStore>>>,
) => mockStore(useUserStore, state);

export const mockUseCartStore = (
  state: Partial<StateOnly<ExtractState<typeof useCartStore>>>,
) => mockStore(useCartStore, state);

export const mockUseFilterStore = (
  state: Partial<StateOnly<ExtractState<typeof useFilterStore>>>,
) => mockStore(useFilterStore, state);
