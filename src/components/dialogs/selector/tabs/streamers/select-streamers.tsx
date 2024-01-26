import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { useSelectorStore } from "@/stores/selector-store";
import { StreamerSchema } from "@/types/streamer.schema";
import {
  BoxSelect,
  CheckSquare,
  Gamepad2,
  MousePointerSquareDashed,
  Radio,
} from "lucide-react";
import { useTranslations } from "next-intl";

type SelectStreamerProps = {
  StaticStreamers: StreamerSchema[];
};

export function SelectStreamers(props: SelectStreamerProps) {
  const t = useTranslations("selector-dialog.tabs.streamers-tab.select");
  const selected = useSelectorStore((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-2.5"
        >
          {t("label")}
          <MousePointerSquareDashed size="1rem" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            selected.setSelectedStreamers(props.StaticStreamers);
          }}
        >
          <CheckSquare size="1rem" className="mr-2" /> {t("all")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            selected.setSelectedStreamers([]);
          }}
        >
          <BoxSelect size="1rem" className="mr-2" /> {t("none")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            selected.setSelectedStreamers(
              props.StaticStreamers.filter(
                (streamer) => !streamer.no_data && streamer.is_live
              )
            );
          }}
        >
          <Radio size="1rem" className="mr-2" /> {t("online")}
        </DropdownMenuItem>
        {env.APP_VARIANT !== "twitch" && (
          <DropdownMenuItem
            onClick={() => {
              selected.setSelectedStreamers(
                props.StaticStreamers.filter(
                  (streamer) =>
                    !streamer.no_data && streamer.is_live && streamer.is_playing
                )
              );
            }}
          >
            <Gamepad2 size="1rem" className="mr-2" /> {t("playing")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
