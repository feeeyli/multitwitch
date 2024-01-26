"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGroupsSearchStore } from "@/stores/groups-search-store";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function SearchBar() {
  const t = useTranslations("selector-dialog.tabs.groups-tab");
  const search = useGroupsSearchStore();

  return (
    <div className="flex flex-grow">
      <Label className="sr-only" htmlFor="streamer-search">
        {t("group-search-label")}
      </Label>
      <Input
        value={search.search ?? ""}
        onChange={(e) => search.setSearch(e.target.value)}
        placeholder={t("group-search-label")}
        className="h-9 rounded-r-none border-r-0"
        id="streamer-search"
        name="streamer-search"
      />
      <Button
        variant="outline"
        className="rounded-l-none border-l-0 px-3 text-muted-foreground"
        size="sm"
        onClick={() => search.setSearch("")}
      >
        <XCircle size="1rem" />
      </Button>
    </div>
  );
}
