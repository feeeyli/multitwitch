import { StreamerSchema } from "@/types/streamer.schema";
import { ReactNode } from "react";

export type ArrayNames = "new" | "favorite" | "default" | "non-default";

export function useRenderStreamers(
  favoriteStreamersStorage: string[],
  pinnedStreamersStorage: StreamerSchema[]
): (
  streamers: StreamerSchema[],
  separator: (index: number) => ReactNode,
  arrayRender: (streamers: StreamerSchema[], name: ArrayNames) => ReactNode
) => (ReactNode | StreamerSchema[])[] {
  function filter(
    streamers: StreamerSchema[],
    filterArray: string[],
    invert: boolean = false
  ) {
    const hasPassed = streamers.filter(
      (streamer) =>
        filterArray.some((filter) => streamer.twitch_name === filter) ===
        !invert
    );

    return [
      hasPassed,
      streamers.filter(
        (streamer) =>
          !hasPassed.some(
            (passed) => passed.twitch_name === streamer.twitch_name
          ) === !invert
      ),
    ];
  }

  function render(
    streamers: StreamerSchema[],
    separator: (index: number) => ReactNode,
    arrayRender: (streamers: StreamerSchema[], name: ArrayNames) => ReactNode
  ) {
    const arrays = split(streamers);

    const hasSeparator = (
      next: StreamerSchema[],
      ...before: StreamerSchema[][]
    ) => next.length > 0 && before.some((item) => item.length > 0);

    const withSeparators = arrays.map((array, i) => {
      const itemsBefore = arrays.slice(0, i);

      if (itemsBefore.length === 0)
        return [arrayRender(array.streamers, array.name as ArrayNames)];

      return hasSeparator(
        array.streamers,
        ...itemsBefore.map((item) => item.streamers)
      )
        ? [separator(i), arrayRender(array.streamers, array.name as ArrayNames)]
        : [arrayRender(array.streamers, array.name as ArrayNames)];
    });

    return withSeparators.flat(1);
  }

  function split(streamers: StreamerSchema[]) {
    const newParticipants = filter(
      streamers,
      (process.env.NEXT_PUBLIC_NEW_PARTICIPANTS ?? "").split("/")
    );

    const favoriteStreamers = filter(
      newParticipants[1],
      favoriteStreamersStorage
    );

    const pinnedStreamers = filter(
      favoriteStreamers[1],
      pinnedStreamersStorage.map((streamer) => streamer.twitch_name)
    );

    const defaultStreamers = pinnedStreamers[1].filter(
      (streamer) => streamer.default_streamer
    );

    const nonDefaultStreamers = pinnedStreamers[1].filter(
      (streamer) => !streamer.default_streamer
    );

    return [
      { name: "new", streamers: newParticipants[0] },
      { name: "favorite", streamers: favoriteStreamers[0] },
      {
        name: "non-default",
        streamers: [...pinnedStreamers[0], ...nonDefaultStreamers],
      },
      { name: "default", streamers: defaultStreamers },
    ];
  }

  return render;
}
