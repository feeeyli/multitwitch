/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { SKIN_HEAD } from "@/data/skin-heads";
import { ManageStreamerSchema, useManageStore } from "@/stores/manage-store";
import { MessageSquare, MessageSquareDashed, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function StreamersList() {
  const manage = useManageStore((state) => state);
  const t = useTranslations("manage-dialog");

  return (
    <section>
      <h3 className="text-center">{t("streamers-title")}</h3>
      <ul className="divide-y">
        {manage.streamers.map((streamer) => (
          <Streamer key={streamer.twitch_name} streamer={streamer} />
        ))}
      </ul>
    </section>
  );
}

type StreamerProps = {
  streamer: ManageStreamerSchema;
};

function Streamer(props: StreamerProps) {
  const t = useTranslations("manage-dialog");
  const manage = useManageStore((state) => state);

  return (
    <li className="py-3 px-1.5 flex gap-3 items-center hover:bg-secondary/30 rounded-md">
      <Button
        size="icon"
        className="h-7 w-7"
        variant="ghost"
        onClick={() => {
          manage.actions.removeStreamer(props.streamer);
        }}
      >
        <X size="1rem" />
      </Button>
      <img
        src={SKIN_HEAD(props.streamer.twitch_name, props.streamer.avatar_url)}
        alt={t("avatar-alt", { name: props.streamer.display_name })}
        className="size-7 pointer-events-none select-none"
      />
      <span className="overflow-x-hidden text-ellipsis flex-grow">
        {props.streamer.display_name}
      </span>
      <Toggle
        size="icon"
        className="group"
        pressed={props.streamer.chat_opened}
        onPressedChange={(pressed) => {
          manage.actions.setStreamerItem({
            ...props.streamer,
            chat_opened: pressed,
          });
        }}
      >
        <MessageSquare className="group-data-[state=off]:hidden" size="1rem" />
        <MessageSquareDashed
          className="group-data-[state=on]:hidden"
          size="1rem"
        />
      </Toggle>
    </li>
  );
}
