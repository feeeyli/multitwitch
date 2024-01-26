import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favoriteStreamers: string[];
  addFavoriteStreamer: (value: string) => void;
  removeFavoriteStreamer: (value: string) => void;
  isStreamerFavorite: (value: string) => boolean;

  favoriteGroups: string[];
  addFavoriteGroup: (value: string) => void;
  removeFavoriteGroup: (value: string) => void;
  isGroupFavorite: (value: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteStreamers: [],
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
