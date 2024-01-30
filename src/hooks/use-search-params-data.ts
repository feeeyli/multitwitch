import { GROUPS } from "@/data/groups";
import { STREAMERS } from "@/data/streamers";
import { getFromArray } from "@/lib/get-from-array";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { GroupWithHideSchema } from "@/stores/selector-store";
import { GroupSchema } from "@/types/groups.schema";
import { StreamerSchema } from "@/types/streamer.schema";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import useStore from "./use-store";

export function useSearchParamsData(): {
  streamers: StreamerSchema[];
  groups: GroupWithHideSchema[];
  chats: string[];
  isLoading: boolean;
} {
  const [queryStreamers] = useQueryState(
    "streamers",
    parseAsArrayOf(parseAsString, "/")
      .withDefault([])
      .withOptions({ history: "push" })
  );
  const [queryGroups] = useQueryState(
    "groups",
    parseAsArrayOf(parseAsString, "/")
      .withDefault([])
      .withOptions({ history: "push" })
  );
  const [queryChats] = useQueryState(
    "chats",
    parseAsArrayOf(parseAsString, "/").withDefault([])
  );
  const customData = useStore(useCustomDataStore, (state) => state);

  if (typeof customData === "undefined")
    return {
      streamers: [],
      groups: [],
      chats: [],
      isLoading: true,
    };

  const query = {
    streamers: queryStreamers,
    groups: queryGroups,
    chats: queryChats,
  };

  /*#region Groups

  const groupsWithoutHides = groupsOnQuery.map((g) => g.split('.-')[0]);
  const onlyGroupHides: string[] = [];

  groupsOnQuery.forEach((g) => {
    if (!g.split('.-')[1]) return;

    onlyGroupHides.push(...g.split('.-')[1].split('-'));
  });

  const streamersFromGroups = getStreamersFromGroups(
    groupsWithoutHides,
    customGroups,
  );

  const groupsWithMembers: { name: string; members: string[] }[] =
    streamersFromGroups.reduce(
      (acc, curr) => {
        const existingGroup = acc.find(
          (group) => group.name === curr.group_name,
        );

        if (existingGroup) {
          existingGroup.members.push(curr.twitch_name);
        } else {
          acc.push({ name: curr.group_name, members: [curr.twitch_name] });
        }

        return acc;
      },
      [] as { name: string; members: string[] }[],
    );

  const fullGroups = [...GROUPS, ...(customGroups as GroupType[])];

  const groups = groupsWithMembers.map((g) => {
    const originalGroup = fullGroups.find((fg) => fg.simple_name === g.name);

    return {
      display_name: originalGroup?.display_name || g.name,
      simple_name: originalGroup?.simple_name || g.name,
      members:
        originalGroup?.members.map((m) => ({
          display_name: m.display_name,
          twitch_name: m.twitch_name,
          is_hidden: onlyGroupHides.includes(m.twitch_name),
          chat_opened: chatsOnQuery.includes(m.twitch_name),
        })) || [],
    };
  });

  //#endregion*/

  const streamers: StreamerSchema[] = query.streamers.map((twitch_name) => {
    const streamer = getFromArray<StreamerSchema>(
      [STREAMERS, customData.pinnedStreamers].flat(),
      "twitch_name",
      twitch_name
    );

    if (typeof streamer === "undefined") {
      return {
        display_name: twitch_name,
        twitch_name,
        avatar_url: "https://placehold.co/300x300/281f37/f9fafb.png?text=o_o",
        no_data: true,
        default_streamer: false,
      };
    }

    return streamer;
  });

  const groups = query.groups
    .map((name) => {
      const [simple_name, hided = ""] = name.split(".");
      const hided_members = hided.split("-");

      const group = getFromArray<GroupSchema>(
        [GROUPS, customData.customGroups].flat(),
        "simple_name",
        simple_name
      );

      if (typeof group === "undefined") return null;

      return {
        ...group,
        hided_members: group.members.filter((member) =>
          hided_members.includes(member.twitch_name)
        ),
      };
    })
    .filter((group) => group) as GroupWithHideSchema[];

  return {
    streamers,
    groups,
    chats: query.chats,
    isLoading: false,
  };
}
