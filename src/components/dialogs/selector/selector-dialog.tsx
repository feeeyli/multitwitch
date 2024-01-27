"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/env";
import { useSearchParamsData } from "@/hooks/use-search-params-data";
import useStore from "@/hooks/use-store";
import { useSelectorStore } from "@/stores/selector-store";
import { Tv } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { GroupsTab } from "./tabs/groups/groups-tab";
import { SelectorFooter } from "./tabs/selector-footer";
import { StreamersTab } from "./tabs/streamers/streamers-tab";

export function SelectorDialog() {
  const t = useTranslations("selector-dialog");
  const selector = useStore(useSelectorStore, (state) => state);
  const { streamers, groups, isLoading } = useSearchParamsData();

  function setSelected() {
    selector?.setSelectedStreamers(streamers);
    selector?.setSelectedGroups(groups);
  }

  useEffect(() => {
    if (isLoading) return;

    setSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          selector?.setSelectedStreamers([]);
          selector?.setSelectedGroups([]);
        } else {
          setSelected();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="dialog">
          <Tv size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50rem] max-h-[90dvh]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description", { type: env.APP_VARIANT })}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="streamers">
          <TabsList className="w-full">
            <TabsTrigger value="streamers" className="flex-1">
              {t("tabs.streamers-tab.title")}
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex-1">
              {t("tabs.groups-tab.title")}
            </TabsTrigger>
          </TabsList>
          <StreamersTab />
          <GroupsTab />
        </Tabs>
        <SelectorFooter />
      </DialogContent>
    </Dialog>
  );
}
