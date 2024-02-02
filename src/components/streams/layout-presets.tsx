import { useGridSize } from "@/hooks/streams/use-grid-size";
import { useLayoutPresets } from "@/hooks/streams/use-layout-presets";
import { useStreamsList } from "@/hooks/streams/use-streams-list";
import useStore from "@/hooks/use-store";
import { useLayoutStorageStore } from "@/stores/layout-storage-store";
import { LayoutPanelLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "usehooks-ts";
import { FourFocus, OneFocus, ResetLayout, TwoFocus } from "../icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function LayoutPresets() {
  const isDesktop = !useMediaQuery("(max-width: 640px)");
  const t = useTranslations("preset-layouts");
  const streamsList = useStreamsList();
  const { columns, rows } = useGridSize(streamsList.length, isDesktop);
  const presets = useLayoutPresets(
    columns,
    rows,
    Math.ceil(window.innerHeight / 36 / rows) * rows
  );
  const layoutStorage = useStore(useLayoutStorageStore, (state) => state);

  if (streamsList.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="dialog">
          <LayoutPanelLeft size="1rem" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        {streamsList.length > 1 && (
          <DropdownMenuItem
            onClick={() => {
              const lay = presets.focus(
                presets.generateBlankLayout(streamsList),
                1
              );

              layoutStorage?.setLayout(lay);
              layoutStorage?.setSwapPoints(
                lay.map((item) => item.i).slice(0, 1)
              );
            }}
          >
            <OneFocus size="1rem" className="mr-2" /> {t("one-focus")}
          </DropdownMenuItem>
        )}
        {streamsList.length > 2 && (
          <DropdownMenuItem
            onClick={() => {
              const lay = presets.focus(
                presets.generateBlankLayout(streamsList),
                2
              );

              layoutStorage?.setLayout(lay);
              layoutStorage?.setSwapPoints(
                lay.map((item) => item.i).slice(0, 2)
              );
            }}
          >
            <TwoFocus size="1rem" className="mr-2" /> {t("two-focus")}
          </DropdownMenuItem>
        )}
        {streamsList.length > 4 && (
          <DropdownMenuItem
            onClick={() => {
              const lay = presets.focus(
                presets.generateBlankLayout(streamsList),
                4
              );

              layoutStorage?.setLayout(lay);
              layoutStorage?.setSwapPoints(
                lay.map((item) => item.i).slice(0, 4)
              );
            }}
          >
            <FourFocus size="1rem" className="mr-2" /> {t("four-focus")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => {
            layoutStorage?.setLayout(
              presets.tiles(presets.generateBlankLayout(streamsList))
            );
            layoutStorage?.setLayout([]);
            layoutStorage?.setSwapPoints([]);
          }}
        >
          <ResetLayout size="1rem" className="mr-2" /> {t("reset")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
