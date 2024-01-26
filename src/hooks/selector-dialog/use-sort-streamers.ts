"use client";

import { useSortStore } from "@/stores/sort-store";
import { StreamerSchema } from "@/types/streamer.schema";

export function useSortStreamers() {
  const sort = useSortStore();

  function sortStreamers(origin: StreamerSchema[]) {
    if (origin.some((o) => o.no_data)) return origin;

    let streamers = [...origin];

    const sortDir = [0, -1, 1];

    if (sort.sortMethod === "name")
      streamers = streamers.sort(
        (a, b) =>
          a.display_name.localeCompare(b.display_name) *
          (sort.direction === "asc" ? 1 : -1)
      );

    if (sort.sortMethod === "default" && sort.direction === "des")
      streamers = streamers.reverse();

    if (sort.first.includes("online"))
      streamers = streamers.sort((x, y) => {
        if (x.no_data || y.no_data) return 0;

        return x.is_live === y.is_live
          ? sortDir[0]
          : x.is_live
          ? sortDir[1]
          : sortDir[2];
      });
    if (sort.first.includes("playing"))
      streamers = streamers.sort((x, y) => {
        if (x.no_data || y.no_data || !x.is_live || !y.is_live) return 0;

        return x.is_playing === y.is_playing
          ? sortDir[0]
          : x.is_playing
          ? sortDir[1]
          : sortDir[2];
      });

    return streamers;
  }

  return sortStreamers;
}
