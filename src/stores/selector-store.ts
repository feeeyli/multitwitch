import { GroupSchema } from "@/types/groups.schema";
import { StreamerSchema } from "@/types/streamer.schema";
import { create } from "zustand";

type GroupWithHideSchema = GroupSchema & {
  hided_members: {
    display_name: string;
    twitch_name: string;
  }[];
};

type UseSelectorStore = {
  selectedStreamers: StreamerSchema[];
  setSelectedStreamers: (value: StreamerSchema[]) => void;

  selectedGroups: GroupWithHideSchema[];
  setSelectedGroups: (value: GroupWithHideSchema[]) => void;
};

export const useSelectorStore = create<UseSelectorStore>((set) => ({
  selectedStreamers: [],
  setSelectedStreamers: (value) => {
    set({ selectedStreamers: value });
  },

  selectedGroups: [],
  setSelectedGroups: (value) => {
    set({ selectedGroups: value });
  },
}));
