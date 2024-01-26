"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GROUPS } from "@/data/groups";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useSelectorStore } from "@/stores/selector-store";
import { BoxSelect, CheckSquare, MousePointerSquareDashed } from "lucide-react";
import { useTranslations } from "next-intl";

export function SelectGroups() {
  const t = useTranslations("selector-dialog.tabs.groups-tab.select");
  const selected = useSelectorStore((state) => state);
  const customData = useStore(useCustomDataStore, (state) => state);

  const Groups = [GROUPS, customData?.customGroups ?? []].flat();

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
            selected.setSelectedGroups(
              Groups.map((group) => ({ ...group, hided_members: [] }))
            );
          }}
        >
          <CheckSquare size="1rem" className="mr-2" /> {t("all")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            selected.setSelectedGroups([]);
          }}
        >
          <BoxSelect size="1rem" className="mr-2" /> {t("none")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
