import { Toggle } from "@/components/ui/toggle";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStream } from "../stream";

export function Sound() {
  const t = useTranslations("streams.stream-header");
  const { setSound, sound } = useStream();

  return (
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
  );
}
