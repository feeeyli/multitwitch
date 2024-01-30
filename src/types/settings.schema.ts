import { z } from "zod";

export const headerItemsNames = z.enum([
  "sound",
  "fullscreen",
  "chat",
  "reload",
  "remove-stream",
  "swap-points",
]);

export const settingsSchema = z.object({
  appearance: z.object({
    theme: z.enum(["dark", "light", "system"]),
    dialogTriggersPosition: z.enum(["right", "bottom", "left"]),
    hideDialog: z.boolean(),
  }),
  streamers: z.object({
    streamersAvatar: z.enum(["twitch", "skin", "both"]),
    streamersStatus: z.object({
      offline: z.boolean(),
      noPlaying: z.boolean(),
    }),
    outro: z.object({
      hideOffline: z.boolean(),
      hideNotPlaying: z.boolean(),
    }),
  }),
  streams: z.object({
    headerItems: z.array(headerItemsNames),
    startMuted: z.boolean(),
  }),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
