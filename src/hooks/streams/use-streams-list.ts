import { includes } from "@/lib/includes";
import { useSearchParamsData } from "../use-search-params-data";

export type StreamSchema = {
  twitch_name: string;
  group_name?: string;
  is_chat: boolean;
};

export function useStreamsList() {
  const { streamers, groups, chats } = useSearchParamsData();

  const mergedStreams: StreamSchema[] = Array.from([
    ...groups
      .map((group) =>
        group.members
          .filter(
            (member) =>
              !includes(group.hided_members, "twitch_name", member.twitch_name)
          )
          .map((member) => ({
            twitch_name: member.twitch_name,
            group_name: group.simple_name,
            is_chat: false,
          }))
      )
      .flat(),
    ...streamers.map((s) => ({
      twitch_name: s.twitch_name,
      group_name: undefined,
      is_chat: false,
    })),
  ]);

  const mergedStreamsWithoutDuplicates = Array.from(
    new Set(mergedStreams.map((item) => item.twitch_name))
  ).map((twitch_name) => {
    const itemWithGroupName = mergedStreams.find(
      (item) => item.twitch_name === twitch_name && item.group_name
    );
    return (
      itemWithGroupName ||
      mergedStreams.find((item) => item.twitch_name === twitch_name)
    );
  }) as StreamSchema[];

  const listWithChat: StreamSchema[] = [
    ...mergedStreamsWithoutDuplicates,
    ...chats.map((c) => ({
      twitch_name: c,
      group_name: undefined,
      is_chat: true,
    })),
  ];

  return listWithChat;
}
