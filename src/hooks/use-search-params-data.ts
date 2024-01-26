import { STREAMERS } from "@/data/streamers";
import { StreamerSchema } from "@/types/streamer.schema";
import { useSearchParams } from "next/navigation";

export function useSearchParamsData(): [
  StreamerSchema[],
  {
    display_name: string;
    simple_name: string;
    members: {
      display_name: string;
      twitch_name: string;
      is_hidden: boolean;
      chat_opened: boolean;
    }[];
  }[]
] {
  const searchParams = useSearchParams();
  // const customGroups = [];

  const streamersOnQuery = searchParams.get("streamers")?.split("/") || [];
  // const groupsOnQuery = searchParams.get('groups')?.split('/') || [];
  // const chatsOnQuery = searchParams.get('chats')?.split('/') || [];

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

  //#region Streamers

  const streamers: StreamerSchema[] = streamersOnQuery.map((s) => {
    const streamer = STREAMERS.find((ss) => ss.twitch_name === s);

    if (streamer) return streamer;

    return {
      twitch_name: s,
      display_name: s,
      avatar_url: "https://placehold.co/300x300/1E1A23/FFF.png?text=o_0",
      no_data: true,
      default_streamer: false,
    };
  });

  //#endregion

  return [streamers, []];
}
