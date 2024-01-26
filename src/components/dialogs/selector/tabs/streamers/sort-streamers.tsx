import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { useSortStore } from "@/stores/sort-store";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CaseUpper,
  Languages,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function SortStreamers() {
  const sort = useSortStore((state) => state);
  const t = useTranslations("selector-dialog.tabs.streamers-tab.sort");

  return (
    <div className="flex">
      <Button
        variant="outline"
        className="rounded-r-none px-2"
        size="sm"
        onClick={() => sort.toggleDirection()}
      >
        {sort.direction === "asc" && <ArrowDownWideNarrow size="1rem" />}
        {sort.direction === "des" && <ArrowUpWideNarrow size="1rem" />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="block items-center gap-2 rounded-l-none border-l-0 px-2.5"
          >
            {t("label")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={sort.sortMethod}
            onValueChange={(value) =>
              sort.setSortMethod(value as typeof sort.sortMethod)
            }
          >
            <DropdownMenuRadioItem value="default">
              <Languages size="1rem" className="mr-2" /> {t("default")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">
              <CaseUpper size="1rem" className="mr-2" /> {t("name")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={sort.first.includes("online")}
            onCheckedChange={(checked) => {
              if (checked) {
                sort.addFirst("online");
              } else {
                sort.removeFirst("online");
              }
            }}
          >
            {t("online-first")}
          </DropdownMenuCheckboxItem>
          {env.APP_VARIANT !== "twitch" && (
            <DropdownMenuCheckboxItem
              checked={sort.first.includes("playing")}
              onCheckedChange={(checked) => {
                if (checked) {
                  sort.addFirst("playing");
                } else {
                  sort.removeFirst("playing");
                }
              }}
            >
              {t("playing-first")}
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
