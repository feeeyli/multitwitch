/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { SKIN_HEAD } from "@/data/skin-heads";
import { useSettings } from "@/hooks/use-settings";
import useStore from "@/hooks/use-store";
import { includes } from "@/lib/includes";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { StreamerSchema } from "@/types/streamer.schema";
import { useQueryClient } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import { BadgeInfo, Heart, HeartCrack, Pin, PinOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, createContext, useContext } from "react";

type StreamerProps = {
  streamer: StreamerSchema;
  children?: ReactNode;
};

const streamerVariants = cva(
  "h-auto pt-3 pb-2 flex-col max-w-[6.5rem] sm:max-w-[8.625rem] hover:bg-muted/60 gap-2",
  {
    variants: {
      is_live: {
        true: "data-[state=on]:text-primary hover:text-primary/60",
        false:
          "data-[state=on]:text-primary/60 [&>picture>img]:grayscale hover:text-muted-foreground/60 text-muted-foreground",
      },
    },
  }
);

const StreamerContext = createContext({} as StreamerSchema);

export function Streamer(props: StreamerProps) {
  const t = useTranslations("selector-dialog.tabs.streamers-tab");
  const {
    settings: {
      streamers: { streamersStatus, streamersAvatar },
    },
  } = useSettings();

  return (
    <StreamerContext.Provider value={props.streamer}>
      <article className="relative">
        {props.children}
        <ToggleGroupItem
          value={props.streamer.twitch_name}
          className={streamerVariants({
            is_live:
              !streamersStatus.offline ||
              (props.streamer.no_data ? true : props.streamer.is_live),
          })}
          variant="default"
        >
          <picture className="size-20 sm:size-28 relative">
            <img
              src={
                streamersAvatar === "skin"
                  ? SKIN_HEAD(
                      props.streamer.twitch_name,
                      props.streamer.avatar_url
                    )
                  : props.streamer.avatar_url
              }
              alt={t("avatar-alt", { name: props.streamer.display_name })}
              width={128}
              height={128}
              className="size-20 sm:size-28 rounded-md pointer-events-none select-none"
            />
            {streamersAvatar === "both" &&
              SKIN_HEAD(props.streamer.twitch_name, "") && (
                <img
                  src={SKIN_HEAD(props.streamer.twitch_name)}
                  alt={t("avatar-alt", { name: props.streamer.display_name })}
                  width={128}
                  height={128}
                  style={{
                    imageRendering: "pixelated",
                  }}
                  className="size-8 pointer-events-none select-none absolute border-2 border-border bottom-1 right-1"
                />
              )}
          </picture>
          <span className="text-ellipsis overflow-x-hidden w-full">
            {props.streamer.display_name}
          </span>
        </ToggleGroupItem>
      </article>
    </StreamerContext.Provider>
  );
}

export function StreamerFavoriteButton() {
  const streamer = useContext(StreamerContext);
  const favorites = useStore(useFavoritesStore, (state) => state);
  const t = useTranslations("selector-dialog.tabs.streamers-tab");

  return (
    <Toggle
      className="absolute -left-1 -top-1 z-10"
      variant="icon"
      size="icon"
      pressed={favorites?.favoriteStreamers.includes(streamer.twitch_name)}
      onPressedChange={(pressed) => {
        if (pressed) {
          favorites?.addFavoriteStreamer(streamer.twitch_name);
        } else {
          favorites?.removeFavoriteStreamer(streamer.twitch_name);
        }
      }}
      title={t(
        favorites?.favoriteStreamers.includes(streamer.twitch_name)
          ? "remove-favorite"
          : "add-favorite"
      )}
    >
      <Heart size="1rem" className="group-data-[state=on]:hidden" />
      <HeartCrack size="1rem" className="group-data-[state=off]:hidden" />
    </Toggle>
  );
}

export function StreamerPinnedButton() {
  const streamer = useContext(StreamerContext);
  const customData = useStore(useCustomDataStore, (state) => state);
  const t = useTranslations("selector-dialog.tabs.streamers-tab");
  const queryClient = useQueryClient();

  return (
    <Toggle
      className="absolute -left-1 -top-1 z-10"
      variant="icon"
      size="icon"
      pressed={includes(
        customData?.pinnedStreamers ?? [],
        "twitch_name",
        streamer.twitch_name
      )}
      onPressedChange={(pressed) => {
        if (pressed) {
          customData?.addPinnedStreamer({
            display_name: streamer.display_name,
            twitch_name: streamer.twitch_name,
            avatar_url: streamer.avatar_url,
            default_streamer: false,
            no_data: true,
          });

          queryClient.setQueryData(
            [
              "static-streamers",
              "pinned-loaded:true",
              "search-params-loaded:true",
            ],
            (data: StreamerSchema[]) => {
              if (data.some((ds) => ds.twitch_name === streamer.twitch_name))
                return data;

              return [streamer, ...data];
            }
          );
        } else {
          customData?.removePinnedStreamer(streamer);
        }
      }}
      title={t(
        includes(
          customData?.pinnedStreamers ?? [],
          "twitch_name",
          streamer.twitch_name
        )
          ? "remove-pinned"
          : "add-pinned"
      )}
    >
      <Pin size="1rem" className="group-data-[state=on]:hidden" />
      <PinOff size="1rem" className="group-data-[state=off]:hidden" />
    </Toggle>
  );
}

export function StreamerPlayingBadge() {
  const t = useTranslations("selector-dialog.tabs.streamers-tab");
  const {
    settings: {
      streamers: { streamersStatus },
    },
  } = useSettings();

  if (!streamersStatus.noPlaying) return null;

  return (
    <Badge
      variant="playing"
      className="px-1.5 py-1.5 absolute top-1 right-1 cursor-help z-10"
      title={t("not-playing")}
    >
      <BadgeInfo size="1rem" />
    </Badge>
  );
}

export function YoutubeStreamerBadge() {
  // const t = useTranslations("selector-dialog.tabs.streamers-tab");
  // const streamer = useContext(StreamerContext);

  // if (!streamer.no_data || streamer.no_data && !streamer.youtube_stream) return null;

  return (
    <Badge
      variant="playing"
      className="px-1.5 py-1.5 absolute top-1 right-1 cursor-help z-10 bg-red-500 hover:bg-red-500/80"
      // title={t("not-playing")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-youtube"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    </Badge>
  );
}
