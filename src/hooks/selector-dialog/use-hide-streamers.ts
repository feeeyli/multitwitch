import { includes } from "@/lib/includes";
import { StreamerSchema } from "@/types/streamer.schema";
import { useSettings } from "../use-settings";

export function useHideStreamers(streamers: StreamerSchema[]) {
  const { selectedStreamers } = {
    selectedStreamers: { value: [] as StreamerSchema[] },
  };
  const {
    settings: {
      streamers: { outro },
    },
  } = useSettings();

  const Streamers = streamers.filter((streamer) => {
    if (
      includes(selectedStreamers.value, "twitch_name", streamer.twitch_name) ||
      streamer.no_data
    )
      return true;

    if (
      (outro.hideOffline && !streamer.is_live) ||
      (outro.hideNotPlaying &&
        streamer.is_live &&
        !streamer.is_playing &&
        streamer.default_streamer)
    )
      return false;

    return true;
  });

  return Streamers;
}
