import { Layout } from "react-grid-layout";
import { create } from "zustand";

type UseLayoutStore = {
  layout: Layout[];
  setLayout: (value: Layout[]) => void;
};

export const useLayoutStore = create<UseLayoutStore>((set) => ({
  layout: [],
  setLayout: (value) => {
    set({ layout: value });
  },
}));
