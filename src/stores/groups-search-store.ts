import { create } from "zustand";

type UseGroupsSearchStore = {
  search: string;
  setSearch: (value: string) => void;
};

export const useGroupsSearchStore = create<UseGroupsSearchStore>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
