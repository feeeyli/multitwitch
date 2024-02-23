import { STREAMERS } from "@/data/streamers";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParamsData } from "../use-search-params-data";
import useStore from "../use-store";

export function useStaticStreamers(): {
  data: StreamerSchema[];
  isLoading: boolean;
} {
  const searchMode = useStreamersSearchStore((state) => state.mode);

  const customData = useStore(useCustomDataStore, (state) => state);
  const { streamers: streamersOnQuery, isLoading: isLoadingSearchParams } =
    useSearchParamsData();

  const NoDataStreamers = [
    customData?.pinnedStreamers || [],
    streamersOnQuery.filter(
      (streamer) =>
        ![...STREAMERS, ...(customData?.pinnedStreamers ?? [])].some(
          (str) => str.twitch_name === streamer.twitch_name
        )
    ),
    STREAMERS,
  ].flat();

  const { data: DataStreamers, isLoading: isQueryLoading } = useQuery<
    StreamerSchema[]
  >({
    queryKey: [
      "static-streamers",
      "pinned-loaded:" + (typeof customData?.pinnedStreamers !== "undefined"),
      "search-params-loaded:" + !isLoadingSearchParams,
    ],
    queryFn: async () => {
      if (
        typeof customData?.pinnedStreamers === "undefined" ||
        searchMode === "twitch" ||
        isLoadingSearchParams ||
        NoDataStreamers.length === 0
      )
        return [];

      const query = NoDataStreamers.filter(
        (str) => !["jdm2088", "vkzm14"].includes(str.twitch_name)
      )
        .map((streamer) => streamer.twitch_name)
        .join("/")
        .toLocaleLowerCase();

      const { data } = await axios.get<StreamerSchema[]>("/api/streamers", {
        params: {
          query,
        },
      });
      return data.concat(
        NoDataStreamers.filter((str) =>
          ["jdm2088", "vkzm14"].includes(str.twitch_name)
        )
      );
    },
  });

  // if (typeof pinnedStreamers === "undefined")
  //   return { data: [], isLoading: false };

  const isLoading = isQueryLoading || DataStreamers?.length === 0;

  const Streamers: StreamerSchema[] =
    isLoading ||
    typeof DataStreamers === "undefined" ||
    DataStreamers.length === 0 ||
    isLoadingSearchParams
      ? NoDataStreamers
      : DataStreamers;

  return {
    data: Streamers,
    isLoading: NoDataStreamers.length > 0 ? isLoading : false,
  };
}
