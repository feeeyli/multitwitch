import { SettingsSchema } from "@/types/settings.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsStore = {
  settings: SettingsSchema;
  setSettings: (value: SettingsSchema) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        appearance: {
          theme: "dark",
          dialogTriggersPosition: "right",
          hideDialog: false,
        },
        streamers: {
          streamersAvatar: "both",
          streamersStatus: {
            offline: true,
            noPlaying: true,
          },
          outro: {
            hideOffline: false,
            hideNotPlaying: false,
          },
        },
        streams: {
          alwaysShowHeader: false,
          headerItems: ["sound", "fullscreen", "chat", "swap-points"],
          startMuted: true,
          movableChat: false,
          useHandleAsHeader: false,
        },
      },
      setSettings: (value) => {
        set({ settings: value });
      },
    }),
    {
      name: "@MultiTwitch/settings",
    }
  )
);
