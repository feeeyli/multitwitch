"use client";

import { useSettingsStore } from "@/stores/settings-store";
import { SettingsSchema } from "@/types/settings.schema";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import useStore from "./use-store";

export function useSettings(): {
  settings: SettingsSchema;
  setSettings: (value: SettingsSchema) => void;
} {
  const settings = useStore(useSettingsStore, (state) => state);
  const { setTheme } = useTheme();

  const theme = settings?.settings.appearance.theme;

  useEffect(() => {
    if (!theme) return;

    setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

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
          headerItems: ["sound", "fullscreen", "chat", "swap-points"],
        },
      },
      setSettings: () => {},
    };

  return settings;
}
