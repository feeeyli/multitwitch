/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { SKIN_HEAD } from "@/data/skin-heads";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useSelectorStore } from "@/stores/selector-store";
import { GroupSchema } from "@/types/groups.schema";
import { Eye, EyeOff, Heart, HeartCrack } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, createContext, useContext, useState } from "react";

type GroupProps = {
  children: ReactNode;
  group: GroupSchema;
};

const GroupContext = createContext({} as GroupSchema);

export function Group(props: GroupProps) {
  const t = useTranslations("selector-dialog.tabs.groups-tab");
  const customData = useStore(useCustomDataStore, (state) => state);

  const cols =
    props.group.members.length === 1
      ? 1
      : [2, 3, 4].includes(props.group.members.length)
      ? 2
      : [5, 6, 8, 9].includes(props.group.members.length)
      ? 3
      : 4;

  return (
    <GroupContext.Provider value={props.group}>
      <HideMembersMenu>
        <article className="relative">
          {props.children}
          <ContextMenuTrigger>
            <ToggleGroupItem
              value={props.group.simple_name}
              className="h-auto pt-3 pb-2 flex-col max-w-[6.5rem] sm:max-w-[8.625rem] hover:bg-muted/40 gap-2"
              variant="default"
            >
              <div className="size-20 sm:size-28 flex items-center rounded-md overflow-hidden">
                <picture className="pointer-events-none select-none flex flex-wrap justify-center">
                  {props.group.members.map((avatar) => (
                    <img
                      key={avatar.twitch_name}
                      style={{
                        width: `${100 / cols}%`,
                        imageRendering: "pixelated",
                      }}
                      src={SKIN_HEAD(
                        avatar.twitch_name,
                        customData?.pinnedStreamers.find(
                          (str) => str.twitch_name === avatar.twitch_name
                        )?.avatar_url
                      )}
                      alt={t("skin-alt", { name: props.group.display_name })}
                      width={128}
                      height={128}
                      // data-hidden={props.group.hidedMembers.some(
                      //   (hm) => hm.twitch_name === avatar.twitch_name,
                      // )}
                      className="pointer-events-none aspect-square data-[hidden=true]:opacity-60 data-[hidden=true]:grayscale"
                    />
                  ))}
                </picture>
              </div>
              <span className="text-ellipsis overflow-x-hidden w-full">
                {props.group.display_name}
              </span>
            </ToggleGroupItem>
          </ContextMenuTrigger>
        </article>
      </HideMembersMenu>
    </GroupContext.Provider>
  );
}

export function GroupFavoriteButton() {
  const group = useContext(GroupContext);
  const favorites = useStore(useFavoritesStore, (state) => state);
  const t = useTranslations("selector-dialog.tabs.groups-tab");

  return (
    <Toggle
      className="absolute -left-1 -top-1 z-10"
      variant="icon"
      size="icon"
      pressed={favorites?.favoriteGroups.includes(group.simple_name)}
      onPressedChange={(pressed) => {
        if (pressed) {
          favorites?.addFavoriteGroup(group.simple_name);
        } else {
          favorites?.removeFavoriteGroup(group.simple_name);
        }
      }}
      title={t(
        favorites?.favoriteGroups.includes(group.simple_name)
          ? "remove-favorite"
          : "add-favorite"
      )}
    >
      <Heart size="1rem" className="group-data-[state=on]:hidden" />
      <HeartCrack size="1rem" className="group-data-[state=off]:hidden" />
    </Toggle>
  );
}

type HideMembersMenuProps = {
  children: ReactNode;
};

function HideMembersMenu(props: HideMembersMenuProps) {
  const group = useContext(GroupContext);
  const [hidedMembers, setHidedMembers] = useState<string[]>([]);
  const t = useTranslations("selector-dialog.tabs.groups-tab");
  const selected = useSelectorStore((state) => state);

  return (
    <ContextMenu onOpenChange={() => setHidedMembers([])}>
      {props.children}
      <ContextMenuContent>
        <ContextMenuGroup>
          {group.members.map((member) => (
            <ContextMenuCheckboxItem
              key={member.twitch_name}
              checked={!hidedMembers.includes(member.twitch_name)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setHidedMembers((old) =>
                    old.filter((h) => h !== member.twitch_name)
                  );
                } else {
                  setHidedMembers((old) => [...old, member.twitch_name]);
                }
              }}
              onSelect={(event) => event.preventDefault()}
              defaultIcon={EyeOff}
              checkedIcon={Eye}
            >
              {member.display_name}
            </ContextMenuCheckboxItem>
          ))}
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem asChild>
          <Button
            onClick={() => {
              const old = [...selected.selectedGroups];

              const groupIndex = old.findIndex(
                (g) => g.simple_name === group.simple_name
              );
              if (groupIndex === -1) {
                old.push({
                  ...group,
                  hided_members: group.members.filter((m) =>
                    hidedMembers.includes(m.twitch_name)
                  ),
                });
              } else {
                old[groupIndex].hided_members = group.members.filter((m) =>
                  hidedMembers.includes(m.twitch_name)
                );
              }
              selected.setSelectedGroups(old);
            }}
            size="sm"
            variant="ghost"
            className="h-8 w-full"
          >
            {t("hide-members")}
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
