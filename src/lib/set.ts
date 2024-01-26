import { StreamerSchema } from "@/types/streamer.schema";

export function set(...arr: StreamerSchema[][]) {
  const merged = arr.flat();

  const arrWithoutDuplicates = Array.from(
    new Set(merged.flat().map((item) => item.twitch_name))
  ).map((twitch_name) =>
    merged.find((item) => item.twitch_name === twitch_name)
  ) as StreamerSchema[];

  return arrWithoutDuplicates;
}
