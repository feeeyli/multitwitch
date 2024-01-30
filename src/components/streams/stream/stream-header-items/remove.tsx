import { Toggle } from "@/components/ui/toggle";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { EyeOff, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";
import { useStream } from "../stream";

export function Remove() {
  const t = useTranslations("streams.stream-header");
  const { stream } = useStream();
  const [streamers, setStreamers] = useQueryState(
    "streamers",
    parseAsArrayOf(parseAsString, "/").withDefault([])
  );
  const [groups, setGroups] = useQueryState(
    "groups",
    parseAsArrayOf(parseAsString, "/").withDefault([])
  );
  const [chats, setChats] = useQueryState(
    "chats",
    parseAsArrayOf(parseAsString, "/").withDefault([])
  );

  const handleRemove = useCallback(() => {
    if (stream.group_name === undefined) {
      const str = streamers.filter((s) => s !== stream.twitch_name);

      setStreamers(str.length > 0 ? str : null);
    } else {
      const grp = groups.map((g) => {
        if (g.split(".")[0] === stream.group_name)
          return `${g}${g.includes(".") ? "" : "."}-${stream.twitch_name}`;

        return g;
      });

      setGroups(grp.length > 0 ? grp : null);
    }

    if (chats.includes(stream.twitch_name)) {
      const cht = chats.filter((chat) => chat !== stream.twitch_name);

      setChats(cht.length > 0 ? cht : null);
    }
  }, [
    chats,
    groups,
    setChats,
    setGroups,
    setStreamers,
    stream.group_name,
    stream.twitch_name,
    streamers,
  ]);

  return (
    <ToolbarButton asChild>
      <Toggle
        variant="ghost"
        size="xs"
        onClick={handleRemove}
        title={t("remove", { type: stream.group_name ? "group" : "streamer" })}
      >
        {!stream.group_name && <X size="1rem" />}
        {stream.group_name && <EyeOff size="1rem" />}
      </Toggle>
    </ToolbarButton>
  );
}
