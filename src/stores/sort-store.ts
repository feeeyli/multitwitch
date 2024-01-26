import { create } from "zustand";

type SortMethod = "default" | "name";
type InFirst = "online" | "playing";
type Direction = "asc" | "des";

type UseSortStore = {
  sortMethod: SortMethod;
  first: InFirst[];
  direction: Direction;
  setSortMethod: (method: SortMethod) => void;
  addFirst: (value: InFirst) => void;
  removeFirst: (value: InFirst) => void;
  toggleDirection: () => void;
};

export const useSortStore = create<UseSortStore>((set, get) => ({
  sortMethod: "default",
  first: [],
  direction: "asc",
  setSortMethod(method) {
    return set({ sortMethod: method });
  },
  addFirst(value) {
    return set({ first: [...get().first, value] });
  },
  removeFirst(value) {
    return set({ first: get().first.filter((f) => f !== value) });
  },
  toggleDirection() {
    return set({ direction: get().direction === "asc" ? "des" : "asc" });
  },
}));
