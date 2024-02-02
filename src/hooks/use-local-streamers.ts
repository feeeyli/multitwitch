import { STREAMERS } from "@/data/streamers";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useSearchParamsData } from "./use-search-params-data";
import useStore from "./use-store";

export function useLocalStreamers() {
  const customData = useStore(useCustomDataStore, (state) => state);
  const { streamers: streamersOnQuery } = useSearchParamsData();

  const Streamers: StreamerSchema[] = [
    customData?.pinnedStreamers || [],
    streamersOnQuery.filter(
      (streamer) =>
        ![...STREAMERS, ...(customData?.pinnedStreamers ?? [])].some(
          (str) => str.twitch_name === streamer.twitch_name
        )
    ),
    STREAMERS,
  ].flat();

  return Streamers;
}
