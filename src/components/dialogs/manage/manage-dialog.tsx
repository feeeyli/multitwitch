"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParamsData } from "@/hooks/use-search-params-data";
import { getWatchUrl } from "@/lib/get-watch-url";
import { includes } from "@/lib/includes";
import { useManageStore } from "@/stores/manage-store";
import { GroupWithHideSchema } from "@/stores/selector-store";
import { ArrowRight, List } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { env } from "process";
import { useEffect } from "react";
import { GroupsList } from "./groups-list";
import { StreamersList } from "./streamers-list";

export function ManageDialog() {
  const t = useTranslations("manage-dialog");
  const { streamers, groups, chats, isLoading } = useSearchParamsData();
  const manage = useManageStore((state) => state);

  function setManage() {
    manage.actions.setGroups(
      groups.map((group) => ({
        ...group,
        members: group.members.map((member) => ({
          ...member,
          chat_opened: includes(streamers, "twitch_name", member.twitch_name)
            ? false
            : chats.includes(member.twitch_name),
          hided: includes(
            group.hided_members,
            "twitch_name",
            member.twitch_name
          ),
        })),
      }))
    );
    manage.actions.setStreamers(
      streamers.map((streamer) => ({
        ...streamer,
        chat_opened: chats.includes(streamer.twitch_name),
      }))
    );
  }

  useEffect(() => {
    if (!isLoading) return;

    setManage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function getSaveUrl() {
    const saveChats: string[] = [
      manage.streamers,
      manage.groups.flatMap((group) => group.members),
    ]
      .flat()
      .filter((s) => s.chat_opened)
      .map((s) => s.twitch_name);

    const saveStreamers = manage.streamers.map(
      ({ chat_opened: _, ...streamer }) => streamer
    );
    const saveGroups = manage.groups.map<GroupWithHideSchema>(
      ({ members, ...group }) => {
        return {
          ...group,
          members: members.map(({ hided: _, chat_opened: __, ...m }) => m),
          hided_members: members
            .filter((m) => m.hided)
            .map(({ hided: _, chat_opened: __, ...m }) => m),
        };
      }
    );

    return getWatchUrl({
      chats: saveChats,
      streamers: saveStreamers,
      groups: saveGroups,
    });
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          manage.actions.setGroups([]);
          manage.actions.setStreamers([]);
        } else {
          setManage();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="dialog">
          <List size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50rem]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description", { type: env.APP_VARIANT })}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[24.5rem] pr-5" type="always">
          <div className="flex flex-col sm:grid grid-cols-2 gap-3">
            <StreamersList />
            <GroupsList />
          </div>
        </ScrollArea>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button variant="ghost" className="gap-2" asChild>
              <Link href={getSaveUrl()}>
                {t("watch")}
                <ArrowRight size="1rem" />
              </Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
