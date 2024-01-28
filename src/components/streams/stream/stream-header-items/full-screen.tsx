import { Toggle } from "@/components/ui/toggle";
import { Expand, Shrink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStream } from "../stream";

export function FullScreen() {
  const t = useTranslations("streams.stream-header");
  const { setFullScreen, fullScreen } = useStream();

  return (
    <Toggle
      variant="ghost"
      size="xs"
      className="group"
      pressed={fullScreen}
      onPressedChange={setFullScreen}
      title={t("full-screen", { active: fullScreen })}
    >
      <Shrink size="1rem" className="group-data-[state=off]:hidden" />
      <Expand size="1rem" className="group-data-[state=on]:hidden" />
    </Toggle>
  );
}
