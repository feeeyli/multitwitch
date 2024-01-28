"use client";

import { useSettings } from "@/hooks/use-settings";
import { cva } from "class-variance-authority";
import { StreamsGrid } from "./streams-grid";

const streamsVariants = cva("flex-1", {
  variants: {
    "dialogs-position": {
      right: "mr-8",
      bottom: "mb-7",
      left: "ml-8",
      none: "",
    },
  },
});

export function Streams() {
  const { settings } = useSettings();

  return (
    <div
      className={streamsVariants({
        "dialogs-position": settings.appearance.hideDialog
          ? "none"
          : settings.appearance.dialogTriggersPosition,
      })}
    >
      <StreamsGrid />
    </div>
  );
}
