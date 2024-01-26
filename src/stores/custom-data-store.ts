import { GroupSchema } from "@/types/groups.schema";
import { StreamerSchema } from "@/types/streamer.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CustomDataStore = {
  pinnedStreamers: StreamerSchema[];
  addPinnedStreamer: (value: StreamerSchema) => void;
  removePinnedStreamer: (value: StreamerSchema) => void;

  customGroups: GroupSchema[];
  addCustomGroup: (value: GroupSchema) => void;
  removeCustomGroup: (value: GroupSchema) => void;
  replaceCustomGroup: (value: GroupSchema, old: GroupSchema) => void;
};

export const useCustomDataStore = create<CustomDataStore>()(
  persist(
    (set, get) => ({
      pinnedStreamers: [],
      addPinnedStreamer: (value) => {
        set({ pinnedStreamers: [...get().pinnedStreamers, value] });
      },
      removePinnedStreamer: (value) => {
        set({
          pinnedStreamers: get().pinnedStreamers.filter(
            (ps) => ps.twitch_name !== value.twitch_name
          ),
        });
      },

      customGroups: [],
      addCustomGroup: (value) => {
        set({ customGroups: [...get().customGroups, value] });
      },
      removeCustomGroup: (value) => {
        set({
          customGroups: get().customGroups.filter(
            (ps) => ps.simple_name !== value.simple_name
          ),
        });
      },
      replaceCustomGroup: (value, oldGroup) => {
        const old = [...get().customGroups];

        const oldGroupIndex = get().customGroups.findIndex(
          (cg) => cg.simple_name === oldGroup.simple_name
        );

        (old[oldGroupIndex] = value),
          set({
            customGroups: old,
          });
      },
    }),
    {
      name: "@MultiTwitch/custom-data",
    }
  )
);
