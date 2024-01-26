import { STREAMERS } from "@/data/streamers";
import { getFromArray } from "@/lib/get-from-array";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useSearchParams } from "next/navigation";
import useStore from "./use-store";

export function useQueryData() {
  const searchParams = useSearchParams();
  const customData = useStore(useCustomDataStore, (state) => state);

  if (
    typeof customData?.customGroups === "undefined" ||
    typeof customData?.pinnedStreamers === "undefined"
  )
    return undefined;

  const query = {
    streamers: searchParams.get("streamers")?.split("/") ?? [],
    groups: searchParams.get("groups")?.split("/") ?? [],
    chats: searchParams.get("chats")?.split("/") ?? [],
  };

  const streamers = query.streamers.map<StreamerSchema>((twitch_name) => {
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

  return;
}
