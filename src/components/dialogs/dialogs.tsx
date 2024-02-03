"use client";

import { env } from "@/env";
import { useSettings } from "@/hooks/use-settings";
import { cva } from "class-variance-authority";
import { LayoutPresets } from "../streams/layout-presets";
import { EventsDialog } from "./events/events-dialog";
import { FaqDialog } from "./faq/faq-dialog";
import { ManageDialog } from "./manage/manage-dialog";
import { SelectorDialog } from "./selector/selector-dialog";
import { SettingsDialog } from "./settings/settings-dialog";

const dialogsVariants = cva(
  "flex gap-6 absolute [&>section]:flex [&>section]:gap-2 overflow-hidden",
  {
    variants: {
      "dialogs-position": {
        right: "right-0 [&>section>button]:rounded-l-md",
        bottom:
          "flex-row-reverse bottom-0 right-0 [&>section>button]:rounded-t-md [&>section]:flex-row-reverse px-6",
        left: "left-0 [&>section>button]:rounded-r-md",
      },
      hide: {
        true: "",
      },
    },
    compoundVariants: [
      {
        "dialogs-position": ["right", "left"],
        className: "flex-col top-0 [&>section]:flex-col py-6",
      },
      {
        "dialogs-position": "right",
        hide: true,
        className:
          "[&>section>button]:translate-x-[75%] hover:[&>section>button]:translate-x-0",
      },
      {
        "dialogs-position": "bottom",
        hide: true,
        className:
          "[&>section>button]:translate-y-[75%] hover:[&>section>button]:translate-y-0",
      },
      {
        "dialogs-position": "left",
        hide: true,
        className:
          "[&>section>button]:-translate-x-[75%] hover:[&>section>button]:translate-x-0",
      },
    ],
  }
);

export function Dialogs() {
  const { settings } = useSettings();

  return (
    <div
      className={dialogsVariants({
        "dialogs-position": settings.appearance.dialogTriggersPosition,
        hide: settings.appearance.hideDialog,
      })}
    >
      <section>
        <SelectorDialog />
        <ManageDialog />
        {env.APP_VARIANT !== "twitch" && <EventsDialog />}
      </section>
      <section>
        <SettingsDialog />
        <FaqDialog />
      </section>
      <section>
        <LayoutPresets />
      </section>
    </div>
  );
}
