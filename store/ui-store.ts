// store/ui-store.ts
import { create } from "zustand";

export type MobileLayer = "nav" | "cart-cta" | "product-cta" | "none";

type UIState = {
  activeLayer: MobileLayer;
  setActiveLayer: (layer: MobileLayer) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeLayer: "nav",
  setActiveLayer: (layer) => set({ activeLayer: layer }),
}));
