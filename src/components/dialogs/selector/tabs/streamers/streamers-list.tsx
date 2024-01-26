import { Loader } from "@/components/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { env } from "@/env";
import { useRenderStreamers } from "@/hooks/selector-dialog/use-render-streamers";
import { useSortStreamers } from "@/hooks/selector-dialog/use-sort-streamers";
import { getStreamer } from "@/lib/getStreamer";
import { set } from "@/lib/set";
import { useSelectorStore } from "@/stores/selector-store";
import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import {
  Streamer,
  StreamerFavoriteButton,
  StreamerPinnedButton,
  StreamerPlayingBadge,
} from "./streamer";

type StreamersListProps = {
  SearchedTwitchStreamers: StreamerSchema[];
  SearchedStaticStreamers: StreamerSchema[];
  StaticStreamers: StreamerSchema[];
  isLoading: boolean;
};

export function StreamersList({
  SearchedStaticStreamers,
  SearchedTwitchStreamers,
  StaticStreamers,
  isLoading,
}: StreamersListProps) {
  const searchMode = useStreamersSearchStore((state) => state.mode);
  const selected = useSelectorStore((state) => state);
  const t = useTranslations("selector-dialog.tabs.streamers-tab");

  const render = useRenderStreamers();
  const sort = useSortStreamers();

  return (
    <ScrollArea className="h-[24.5rem]" type="always">
      <ToggleGroup
        type="multiple"
        className="flex-wrap gap-3 py-2"
        value={selected.selectedStreamers.map((streamer) => {
          return streamer.twitch_name;
        })}
        onValueChange={(value) => {
          selected.setSelectedStreamers(
            value.map((streamer) =>
              getStreamer(
                [
                  StaticStreamers,
                  SearchedTwitchStreamers,
                  selected.selectedStreamers,
                ].flat(),
                streamer
              )
            )
          );
        }}
      >
        {isLoading && <Loader>{t("loading-streamers")}</Loader>}
        {searchMode === "static" &&
          env.APP_VARIANT === "twitch" &&
          StaticStreamers.length === 0 && (
            <p className="text-muted-foreground flex gap-2 items-center justify-center max-w-2xl text-center w-[90%] h-full p-6 text-balance">
              {t.rich("no-pinned-streamers", {
                br: () => <br />,
              })}
            </p>
          )}
        {searchMode === "twitch" &&
          SearchedTwitchStreamers.length === 0 &&
          !isLoading && (
            <p className="text-muted-foreground flex gap-2 items-center justify-center max-w-2xl text-center w-[90%] h-full p-6 text-balance">
              {t("no-searched-streamers")}
            </p>
          )}
        <>
          {searchMode === "static" &&
            render(
              set(SearchedStaticStreamers, selected.selectedStreamers),
              (index) => <Separator key={index} />,
              (streamers, name) => {
                const sorted =
                  name === "default" || env.APP_VARIANT === "twitch"
                    ? sort(streamers)
                    : streamers.sort((x, y) =>
                        x.display_name.localeCompare(y.display_name)
                      );

                if (name === "new") {
                  if (streamers.length === 0) return;

                  return (
                    <Fragment key="new">
                      <h3 className="w-full text-center text-lg text-primary">
                        {t("new-participants", { count: streamers.length })}
                      </h3>
                      {sorted.map((streamer) => (
                        <Streamer
                          streamer={{ ...streamer, no_data: true }}
                          key={streamer.twitch_name}
                        >
                          <StreamerFavoriteButton />
                        </Streamer>
                      ))}
                    </Fragment>
                  );
                }

                return sorted.map((streamer) => (
                  <Streamer streamer={streamer} key={streamer.twitch_name}>
                    {streamer.default_streamer && <StreamerFavoriteButton />}
                    {!streamer.no_data &&
                      streamer.is_live &&
                      !streamer.is_playing &&
                      env.APP_VARIANT !== "twitch" && <StreamerPlayingBadge />}
                    {!streamer.no_data && !streamer.default_streamer && (
                      <StreamerPinnedButton />
                    )}
                  </Streamer>
                ));
              }
            )}
          {searchMode === "twitch" &&
            SearchedTwitchStreamers.map((streamer) => (
              <Streamer streamer={streamer} key={streamer.twitch_name}>
                {streamer.default_streamer && <StreamerFavoriteButton />}
                {!streamer.no_data &&
                  streamer.is_live &&
                  !streamer.is_playing && <StreamerPlayingBadge />}
                {!streamer.no_data && !streamer.default_streamer && (
                  <StreamerPinnedButton />
                )}
              </Streamer>
            ))}
        </>
      </ToggleGroup>
    </ScrollArea>
  );
}
