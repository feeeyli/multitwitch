import { StreamerSchema } from "@/types/streamer.schema";

export function getStreamer(streamers: StreamerSchema[], twitch_name: string) {
  return streamers.find((streamer) => streamer.twitch_name === twitch_name)!;
}
