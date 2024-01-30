import { AddSwapPoint, RemoveSwapPoint } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";
import { useLayoutStorageStore } from "@/stores/layout-storage-store";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { useTranslations } from "next-intl";
import { useStream } from "../../stream";

export function ToggleSwapPoint() {
  const t = useTranslations("streams.stream-header");
  const { stream } = useStream();
  const { addSwapPoint, getSwapPoints, removeSwapPoint } =
    useLayoutStorageStore();

  const isSwapPointActive = getSwapPoints().includes(
    stream.twitch_name + (stream.is_chat ? "-chat" : "")
  );

  return (
    <ToolbarButton asChild>
      <Toggle
        variant="ghost"
        size="xs"
        className="group"
        pressed={isSwapPointActive}
        onPressedChange={(pressed) => {
          if (pressed) {
            if (getSwapPoints().length >= 4) return;
            addSwapPoint(stream.twitch_name + (stream.is_chat ? "-chat" : ""));
          } else {
            removeSwapPoint(
              stream.twitch_name + (stream.is_chat ? "-chat" : "")
            );
          }
        }}
        title={t("toggle-swap-point", { active: isSwapPointActive })}
      >
        <RemoveSwapPoint
          size="1rem"
          className="group-data-[state=off]:hidden"
        />
        <AddSwapPoint size="1rem" className="group-data-[state=on]:hidden" />
      </Toggle>
    </ToolbarButton>
  );
}
