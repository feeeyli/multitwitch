"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { formatSelectedList } from "@/lib/format-selected-list";
import { getWatchUrl } from "@/lib/get-watch-url";
import { useSelectorStore } from "@/stores/selector-store";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function SelectorFooter() {
  const selected = useSelectorStore((state) => state);
  const t = useTranslations("selector-dialog");

  return (
    <DialogFooter className="flex-col sm:flex-col items-end">
      <p className="w-full text-sm line-clamp-2 text-ellipsis">
        <span className="text-muted-foreground">
          {t("selected", {
            count:
              selected.selectedGroups.length +
              selected.selectedStreamers.length,
          })}
        </span>
        {formatSelectedList({
          streamers: selected.selectedStreamers,
          groups: selected.selectedGroups,
        })}
      </p>
      <DialogClose asChild>
        <Button variant="ghost" className="gap-2" asChild>
          <Link
            href={getWatchUrl({
              streamers: selected.selectedStreamers,
              groups: selected.selectedGroups,
            })}
          >
            {t("watch")}
            <ArrowRight size="1rem" />
          </Link>
        </Button>
      </DialogClose>
    </DialogFooter>
  );
}
