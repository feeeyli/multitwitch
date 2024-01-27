"use client";

import { useSettingsStore } from "@/stores/settings-store";
import { SettingsSchema } from "@/types/settings.schema";
import useStore from "./use-store";

export function useSettings(): {
  settings: SettingsSchema;
  setSettings: (value: SettingsSchema) => void;
} {
  const settings = useStore(useSettingsStore, (state) => state);

  if (
    typeof settings === "undefined" ||
    typeof settings.settings === "undefined"
  )
    return {
      settings: {
        appearance: {
          theme: "dark",
          dialogTriggersPosition: "right",
          hideDialog: false,
        },
        streamers: {
          streamersAvatar: "twitch",
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
          headerItems: ["mute", "fullscreen", "chat", "swap-points"],
          startMuted: true,
          movableChat: false,
          useHandleAsHeader: false,
        },
      },
      setSettings: () => {},
    };

  return settings;
}
