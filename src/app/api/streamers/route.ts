import { STREAMERS } from "@/data/streamers";
import { env } from "@/env";
import { includes } from "@/lib/includes";
import { StreamerSchema } from "@/types/streamer.schema";

type TwitchResponse = {
  data: {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    tags: string[];
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: string[];
    is_mature: boolean;
  }[];
};

type UserTwitchResponse = {
  data: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
  }[];
};

async function getStreamers(query: string) {
  const userLogins = query
    .split("/")
    .map((streamer) => `user_login=${streamer}`)
    .join("&");

  const streamsRes = await fetch(
    `https://api.twitch.tv/helix/streams?${userLogins}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_SECRET}`,
        "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      },
      next: { revalidate: 60 },
    }
  );

  const streamersRes = await fetch(
    `https://api.twitch.tv/helix/users?${userLogins.replaceAll(
      "user_login",
      "login"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_SECRET}`,
        "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      },
      next: { revalidate: 60 },
    }
  );

  const { data: streamsData } = (await streamsRes.json()) as TwitchResponse;
  const { data: streamersData } =
    (await streamersRes.json()) as UserTwitchResponse;

  const streamers = streamersData.map((streamer): StreamerSchema => {
    const stream = streamsData.find((s) => s.user_login === streamer.login);

    const is_default = includes(STREAMERS, "twitch_name", streamer.login);

    const offline: StreamerSchema = {
      display_name: streamer.display_name,
      twitch_name: streamer.login,
      avatar_url: streamer.profile_image_url,
      is_live: false,
      no_data: false,
      default_streamer: is_default,
    };

    if (typeof stream === "undefined") return offline;

    const is_playing =
      /(qsmp)|(minecraft)|(frogg smp)|(fsmp)/i.test(
        stream.title || "" //tags.concat(stream.title).join(",")
      ) || stream.game_name === "Minecraft";

    return {
      ...offline,
      is_live: true,
      is_playing:
        !is_default || env.APP_VARIANT === "twitch" ? undefined : is_playing,
      title: stream.title,
      language: stream.language,
    };
  });

  return query
    .split("/")
    .map((s) => streamers.find((str) => str.twitch_name === s)!);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) return Response.json(STREAMERS);

  const parsedStreamers: StreamerSchema[] | undefined = await getStreamers(
    query
  );

  if (typeof parsedStreamers === "undefined") return Response.json(STREAMERS);

  return Response.json(parsedStreamers);
}
