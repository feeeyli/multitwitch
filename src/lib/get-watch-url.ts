import { GroupWithHideSchema } from "@/stores/selector-store";
import { StreamerSchema } from "@/types/streamer.schema";

type GetWatchUrlParams = {
  streamers?: StreamerSchema[];
  groups?: GroupWithHideSchema[];
  chats?: string[];
};

export function getWatchUrl({
  streamers = [],
  groups = [],
  chats = [],
}: GetWatchUrlParams) {
  const url = new URLSearchParams();

  const filteredChats = chats.filter((chat) =>
    streamers.some((s) => s.twitch_name === chat)
  );

  if (streamers.length > 0)
    url.set("streamers", streamers.map((s) => s.twitch_name).join("/"));

  if (groups.length > 0)
    url.set(
      "groups",
      groups
        .map((g) => {
          if (g.hided_members.length === 0) return g.simple_name;

          return `${g.simple_name}.-${g.hided_members
            .map((m) => m.twitch_name)
            .join("-")}`;
        })
        .join("/")
    );
  if (filteredChats.length > 0) url.set("chats", filteredChats.join("/"));

  return ("?" + url).replaceAll("%2F", "/");
}
