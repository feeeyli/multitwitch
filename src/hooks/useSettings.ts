import { z } from "zod";

const settingsSchema = z.object({
  appearance: z.object({
    theme: z.enum([
      "purgatory",
      "dark",
      "light",
      "gray-dark",
      "gray-light",
      "system",
    ]),
    dialogTriggersPosition: z.enum(["right", "bottom", "left"]),
    hideDialog: z.boolean(),
  }),
  streamers: z.object({
    streamersAvatar: z.enum(["twitch", "skin", "both"]),
    streamStatus: z.object({
      offline: z.boolean(),
      noPlaying: z.boolean(),
    }),
    outro: z.object({
      hideOffline: z.boolean(),
      hideNotPlaying: z.boolean(),
      showOpposite: z.boolean(),
    }),
  }),
  streams: z.object({
    alwaysShowHeader: z.boolean(),
    headerItems: z.array(z.string()),
    movableChat: z.boolean(),
    useHandleAsHeader: z.boolean(),
    startMuted: z.boolean(),
  }),
});

export function useSettings() {
  return [
    settingsSchema.parse({
      appearance: {
        theme: "dark",
        dialogTriggersPosition: "right",
        hideDialog: false,
      },
      streamers: {
        streamersAvatar: "twitch",
        streamStatus: {
          offline: true,
          noPlaying: true,
        },
        outro: {
          hideOffline: false,
          hideNotPlaying: false,
          showOpposite: false,
        },
      },
      streams: {
        alwaysShowHeader: false,
        startMuted: true,
        movableChat: false,
        useHandleAsHeader: false,
        headerItems: ["mute", "fullscreen", "chat", "captions"],
      },
    }),
  ];
}
