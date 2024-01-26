import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useDebounce } from "usehooks-ts";
import { useHideStreamers } from "./use-hide-streamers";
import { useStaticStreamers } from "./use-static-streamers";

export function useSearch(): {
  SearchedTwitchStreamers: StreamerSchema[];
  SearchedStaticStreamers: StreamerSchema[];
  StaticStreamers: StreamerSchema[];
  isLoading: boolean;
} {
  const search = useStreamersSearchStore((state) => state);

  const trimmedSearch = useDebounce(search.search, 500).trim();

  const { data: TwitchSearchStreamers, isLoading: isLoadingTwitchSearch } =
    useQuery({
      queryKey: ["streamer-search"].concat(
        trimmedSearch !== "" && search.mode === "twitch" ? trimmedSearch : []
      ),
      queryFn: async () => {
        if (trimmedSearch === "" || search.mode === "static") return [];

        const { data } = await axios.get<StreamerSchema[]>("/api/search", {
          params: {
            query: trimmedSearch.toLocaleLowerCase(),
          },
        });
        return data;
      },
    });

  const { data: Streamers, isLoading: isLoadingStaticStreamers } =
    useStaticStreamers();

  const streamersWithHide = useHideStreamers(Streamers);

  const isLoading = isLoadingTwitchSearch || isLoadingStaticStreamers;

  const StaticSearchStreamers = matchSorter(
    streamersWithHide,
    search.mode === "static" ? search.search : "",
    {
      keys: ["twitch_name", "display_name"],
      baseSort: () => 0,
    }
  );

  return {
    SearchedTwitchStreamers: TwitchSearchStreamers ?? [],
    SearchedStaticStreamers: StaticSearchStreamers,
    StaticStreamers: Streamers,
    isLoading,
  };
}
