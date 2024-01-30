"use client";

import { useStreamsList } from "@/hooks/streams/use-streams-list";
import { useSettings } from "@/hooks/use-settings";
import { cva } from "class-variance-authority";
import { Tv } from "lucide-react";
import { useTranslations } from "next-intl";
import { StreamsGrid } from "./streams-grid";

const streamsVariants = cva(
  "flex-1 flex items-center justify-center max-h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar",
  {
    variants: {
      "dialogs-position": {
        right: "mr-8",
        bottom: "mb-7",
        left: "ml-8",
        none: "",
      },
    },
  }
);

export function Streams() {
  const { settings } = useSettings();
  const streamsList = useStreamsList();
  const t = useTranslations("streams");

  // const { swapPoints, layout, setLayout } = useLayoutStorageStore();

  return (
    <div
      className={streamsVariants({
        "dialogs-position": settings.appearance.hideDialog
          ? "none"
          : settings.appearance.dialogTriggersPosition,
      })}
    >
      {streamsList.length > 0 && <StreamsGrid />}
      {streamsList.length === 0 && (
        <p className="text-center max-w-96 text-balance">
          {t.rich("no-streams", {
            icon: () => (
              <Tv size="1.25rem" className="text-primary inline-block mx-0.5" />
            ),
            br: () => <br />,
          })}
        </p>
      )}
      {/* <div className="bg-red-500 p-4 absolute bottom-4 right-4">
        <Button variant="ghost" size="sm" onClick={() => setLayout([])}>
          clear
        </Button>
        <ScrollArea className="h-48">
          <pre>{JSON.stringify(layout, null, 2)}</pre>
        </ScrollArea>
        <hr />
        <pre>{JSON.stringify(swapPoints, null, 2)}</pre>
      </div> */}
    </div>
  );
}
