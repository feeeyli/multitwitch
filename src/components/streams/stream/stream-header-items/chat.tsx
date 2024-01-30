import { Toggle } from "@/components/ui/toggle";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { MessageSquare, MessageSquareDashed } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useStream } from "../stream";

export function Chat() {
  const t = useTranslations("streams.stream-header");
  const { stream } = useStream();
  const [chats, setChats] = useQueryState(
    "chats",
    parseAsArrayOf(parseAsString, "/").withDefault([])
  );
  const isChatActive = chats.includes(stream.twitch_name);

  function setChat(pressed: boolean) {
    if (pressed) {
      setChats([...chats, stream.twitch_name]);
    } else {
      const updatedChats = chats.filter((chat) => chat !== stream.twitch_name);
      setChats(updatedChats.length > 0 ? updatedChats : null);
    }
  }

  return (
    <ToolbarButton asChild>
      <Toggle
        variant="ghost"
        size="xs"
        className="group"
        pressed={isChatActive}
        onPressedChange={setChat}
        title={t("chat", { active: isChatActive })}
      >
        <MessageSquare size="1rem" className="group-data-[state=off]:hidden" />
        <MessageSquareDashed
          size="1rem"
          className="group-data-[state=on]:hidden"
        />
      </Toggle>
    </ToolbarButton>
  );
}
