import { StreamerSchema } from "@/types/streamer.schema";
import { create } from "zustand";

export type ManageStreamerSchema = StreamerSchema & {
  chat_opened: boolean;
};

export type ManageMemberGroupSchema = {
  display_name: string;
  twitch_name: string;
  avatar_url: string | null;
  chat_opened: boolean;
  hided: boolean;
};

export type ManageGroupSchema = {
  display_name: string;
  simple_name: string;
  members: ManageMemberGroupSchema[];
  default_group: boolean;
};

type UseManageStore = {
  streamers: ManageStreamerSchema[];
  groups: ManageGroupSchema[];

  actions: {
    setStreamers: (value: ManageStreamerSchema[]) => void;
    removeStreamer: (value: ManageStreamerSchema) => void;
    setStreamerItem: (value: ManageStreamerSchema) => void;

    setGroups: (value: ManageGroupSchema[]) => void;
    removeGroup: (value: ManageGroupSchema) => void;
    setGroupItem: (value: ManageGroupSchema) => void;
  };
};

export const useManageStore = create<UseManageStore>((set, get) => ({
  streamers: [],
  groups: [],

  actions: {
    setStreamers: (value) => {
      set({ streamers: value });
    },
    removeStreamer: (value) =>
      set({
        streamers: get().streamers.filter(
          (s) => s.twitch_name !== value.twitch_name
        ),
      }),
    setStreamerItem: (value) => {
      const old = [...get().streamers];
      const index = old.findIndex((o) => o.twitch_name === value.twitch_name);

      if (index === -1) return;

      old[index] = value;

      set({ streamers: old });
    },

    setGroups: (value) => set({ groups: value }),
    removeGroup: (value) =>
      set({
        groups: get().groups.filter((g) => g.simple_name !== value.simple_name),
      }),
    setGroupItem: (value) => {
      const old = [...get().groups];
      const index = old.findIndex((o) => o.simple_name === value.simple_name);

      if (index === -1) return;

      old[index] = value;

      set({ groups: old });
    },
  },
}));
