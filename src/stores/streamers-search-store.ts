import { create } from "zustand";

type UseSearchStore = {
  search: string;
  setSearch: (value: string) => void;
  mode: "static" | "twitch";
  toggleMode: () => void;
};

export const useStreamersSearchStore = create<UseSearchStore>((set, get) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  mode: "static",
  toggleMode: () =>
    set({ mode: get().mode === "static" ? "twitch" : "static", search: "" }),
}));
