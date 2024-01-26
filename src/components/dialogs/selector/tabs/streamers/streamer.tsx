/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
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
  "h-auto pt-3 pb-2 flex-col max-w-[8.625rem] hover:bg-muted/40 gap-2",
  {
    variants: {
      is_live: {
        true: "data-[state=on]:text-primary hover:text-primary/60",
        false:
          "data-[state=on]:text-primary/60 [&>img]:grayscale text-muted-foreground",
      },
    },
  }
);

const StreamerContext = createContext({} as StreamerSchema);

export function Streamer(props: StreamerProps) {
  const t = useTranslations("selector-dialog.tabs.streamers-tab");

  return (
    <StreamerContext.Provider value={props.streamer}>
      <article className="relative">
        {props.children}
        <ToggleGroupItem
          value={props.streamer.twitch_name}
          className={streamerVariants({
            is_live: props.streamer.no_data ? true : props.streamer.is_live,
          })}
          variant="default"
        >
          <img
            src={props.streamer.avatar_url}
            alt={t("avatar-alt", { name: props.streamer.display_name })}
            width={128}
            height={128}
            className="size-28 rounded-md pointer-events-none select-none"
          />
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

  return (
    <Badge
      variant="playing"
      className="px-1.5 py-1.5 absolute top-1 right-1 cursor-help"
      title={t("not-playing")}
    >
      <BadgeInfo size="1rem" />
    </Badge>
  );
}
