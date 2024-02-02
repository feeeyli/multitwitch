import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favoriteStreamers: string[];
  setFavoriteStreamers: (value: string[]) => void;
  addFavoriteStreamer: (value: string) => void;
  removeFavoriteStreamer: (value: string) => void;
  isStreamerFavorite: (value: string) => boolean;

  favoriteGroups: string[];
  setFavoriteGroups: (value: string[]) => void;
  addFavoriteGroup: (value: string) => void;
  removeFavoriteGroup: (value: string) => void;
  isGroupFavorite: (value: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteStreamers: [],
      setFavoriteStreamers: (value) => set({ favoriteStreamers: value }),
      addFavoriteStreamer: (value) => {
        set({ favoriteStreamers: [...get().favoriteStreamers, value] });
      },
      removeFavoriteStreamer: (value) => {
        set({
          favoriteStreamers: get().favoriteStreamers.filter(
            (fs) => fs !== value
          ),
        });
      },
      isStreamerFavorite: (value) => get().favoriteStreamers.includes(value),

      favoriteGroups: [],
      setFavoriteGroups: (value) => set({ favoriteGroups: value }),
      addFavoriteGroup: (value) => {
        set({ favoriteGroups: [...get().favoriteGroups, value] });
      },
      removeFavoriteGroup: (value) => {
        set({
          favoriteGroups: get().favoriteGroups.filter((fg) => fg !== value),
        });
      },
      isGroupFavorite: (value) => get().favoriteGroups.includes(value),
    }),
    {
      name: "@MultiTwitch/favorites",
    }
  )
);
