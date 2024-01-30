import { Toggle } from "@/components/ui/toggle";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStream } from "../stream";

export function Sound() {
  const t = useTranslations("streams.stream-header");
  const { setSound, sound } = useStream();

  return (
    <ToolbarButton asChild>
      <Toggle
        variant="ghost"
        size="xs"
        className="group"
        pressed={sound}
        onPressedChange={setSound}
        title={t("sound", { active: sound })}
      >
        <Volume2 size="1rem" className="group-data-[state=off]:hidden" />
        <VolumeX size="1rem" className="group-data-[state=on]:hidden" />
      </Toggle>
    </ToolbarButton>
  );
}
