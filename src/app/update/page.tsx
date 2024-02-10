"use client";

import { useLocalStreamers } from "@/hooks/use-local-streamers";
import { SettingsSchema, settingsSchema } from "@/types/settings.schema";
import { StreamerSchema } from "@/types/streamer.schema";
import { useRouter } from "next/navigation";
import { Layout } from "react-grid-layout";

function sort(arr: string[] | undefined) {
  if (typeof arr === "undefined") return undefined;

  return arr.sort((a, b) => a.localeCompare(b));
}

function replaceKeys(
  obj: Record<string, string[] | Layout[]>
): Record<string, string[] | Layout[]> {
  const newObj: Record<string, string[] | Layout[]> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = sort(key.replace("$chats$", "").split("/"))!.join("/");
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}

function parseLayout(
  obj: Record<string, Layout[]>,
  Streamers: StreamerSchema[]
): Record<string, Layout[]> {
  const newObj: Record<string, Layout[]> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        !key
          .split("/")
          .filter((k) => !k.includes("$"))
          .some(
            (k) =>
              !Streamers.some(
                (s) =>
                  s.twitch_name.toLocaleLowerCase() === k.toLocaleLowerCase()
              )
          )
      )
        newObj[key] = obj[key]
          .map(({ moved, static: stc, i, ...innerObj }) => {
            // console.log(
            //   "> key",
            //   Streamers.find(
            //     (s) =>
            //       s.twitch_name.toLocaleLowerCase() ===
            //       key.split("/")[Number(innerObj.i)].toLocaleLowerCase()
            //   )?.twitch_name
            // );

            if (!key.split("/")[Number(i)]) return null;

            return {
              ...innerObj,
              i: key.split("/")[Number(i)].toLocaleLowerCase(),
              minW: 0,
              minH: 0,
              moved,
              static: stc,
            };
          })
          .filter((l) => l !== null) as Layout[];
    }
  }
  return newObj;
}

export default function Update() {
  const router = useRouter();
  const LocalStreamers = useLocalStreamers();

  if (typeof window !== "undefined") {
    const settings = JSON.parse(
      window.localStorage.getItem("settings") ?? "{}"
    );

    if (Object.keys(settings).length > 0) {
      const parsedSettings = settingsSchema.safeParse({
        appearance: {
          theme: settings.appearance.theme
            .replace("purgatory", "dark")
            .replaceAll("gray-", ""),
          ...settings.appearance,
        },
        streamers: {
          streamersStatus: settings.streamers.streamStatus,
          ...settings.streamers,
        },
        streams: {
          headerItems: settings.streams.headerItems
            .map((item: string) => (item === "mute" ? "sound" : item))
            .filter(
              (item: string) =>
                !["captions", "move-left", "move-right"].includes(item)
            ),
        },
      } as SettingsSchema);

      if (parsedSettings.success) {
        // console.log("> update", "@MultiTwitch/settings");
        window.localStorage.setItem(
          "@MultiTwitch/settings",
          JSON.stringify({
            state: {
              settings: parsedSettings.data,
            },
            version: 0,
          })
        );
      } else {
        console.log("> parsedSettings", parsedSettings);
      }
    }

    // custom data
    const pinnedStreamers = JSON.parse(
      window.localStorage.getItem("pinned-streamers") ?? "[]"
    ) as {
      display_name: string;
      twitch_name: string;
      avatar_url: string;
    }[];
    const customGroups = JSON.parse(
      window.localStorage.getItem("custom-groups") ?? "[]"
    ) as {
      groupName: string;
      simpleGroupName: string;
      members: string[];
      avatars: string[];
      twitchNames: string[];
    }[];

    const customData = {
      pinnedStreamers: pinnedStreamers.map((ps) => ({
        ...ps,
        default_streamer: false,
        no_data: true,
      })) as StreamerSchema[],
      customGroups: customGroups.map((cg) => ({
        display_name: cg.groupName,
        simple_name: cg.simpleGroupName,
        members: cg.twitchNames.map((m) => ({
          display_name: cg.members[cg.twitchNames.indexOf(m)],
          twitch_name: m
            .toLocaleLowerCase()
            .replace("foolish_gamers", "foolish"),
          avatar_url:
            LocalStreamers.find(
              (s) =>
                s.twitch_name ===
                m.toLocaleLowerCase().replace("foolish_gamers", "foolish")
            )?.avatar_url ??
            "https://placehold.co/300x300/281f37/f9fafb.png?text=o_o",
        })),
        default_group: false,
      })),
    };

    if (
      customData.pinnedStreamers.length > 0 ||
      customData.customGroups.length > 0
    ) {
      // console.log("> update", "@MultiTwitch/custom-data");
      window.localStorage.setItem(
        "@MultiTwitch/custom-data",
        JSON.stringify({
          state: {
            pinnedStreamers: customData.pinnedStreamers,
            customGroups: customData.customGroups,
          },
          version: 0,
        })
      );
    }

    // favorites
    const favoriteGroups = JSON.parse(
      window.localStorage.getItem("favorite-groups") ?? "[]"
    );
    const favoriteStreamers = JSON.parse(
      window.localStorage.getItem("favorite-streamers") ?? "[]"
    );

    const favorites = {
      favoriteStreamers,
      favoriteGroups,
    };

    if (
      favorites.favoriteStreamers.length > 0 ||
      favorites.favoriteGroups.length > 0
    ) {
      // console.log("> update", "@MultiTwitch/favorites");
      window.localStorage.setItem(
        "@MultiTwitch/favorites",
        JSON.stringify({
          state: {
            favoriteStreamers: favorites.favoriteStreamers,
            favoriteGroups: favorites.favoriteGroups,
          },
          version: 0,
        })
      );
    }

    // layout
    // const swapPoints = JSON.parse(
    //   window.localStorage.getItem("swap-points-memory") ?? "{}"
    // );
    const layout = JSON.parse(
      window.localStorage.getItem("layout-memory") ?? "{}"
    );

    if (
      // Object.keys(swapPoints).length > 0 ||
      Object.keys(layout).length > 0
    ) {
      // const parsedSwapPoints = replaceKeys(swapPoints) as Record<
      //   string,
      //   string[]
      // >;

      const parsedLayout = replaceKeys(
        parseLayout(layout, LocalStreamers)
      ) as Record<string, Layout[]>;

      // console.log("> update", "@MultiTwitch/layout");
      window.localStorage.setItem(
        "@MultiTwitch/layout",
        JSON.stringify({
          state: {
            swapPoints: {},
            layout: parsedLayout,
          },
          version: 0,
        })
      );
    }

    window.localStorage.removeItem("not-first-view");
    window.localStorage.removeItem("swap-points-memory");
    window.localStorage.removeItem("easter-eggs");
    window.localStorage.removeItem("favorite-groups");
    window.localStorage.removeItem("pinned-streamers");
    window.localStorage.removeItem("favorite-streamers");
    window.localStorage.removeItem("layout-memory");
    window.localStorage.removeItem("custom-groups");
    window.localStorage.removeItem("settings");
    window.localStorage.removeItem("changelogs-view");

    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-24 gap-8">
      <h1 className="font-semibold text-xl">Updating MultiTwitch...</h1>
      <h2 className="font-medium text-lg">Please wait for redirect</h2>
    </main>
  );
}
