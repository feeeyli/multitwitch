import { getSpecialStreamer } from "@/data/special-streamers";
import { useTheme } from "next-themes";
import ReactPlayer from "react-player";
import { TwitchChat } from "react-twitch-embed";
import { useStream } from "./stream";

export function StreamPlayer() {
  const { stream, sound, refreshKey } = useStream();
  const { theme, systemTheme } = useTheme();

  const actualTheme = theme === "system" ? systemTheme : theme;

  if (getSpecialStreamer(stream.twitch_name)) {
    return (
      <iframe
        src={getSpecialStreamer(stream.twitch_name)!.stream_url}
        allow="autoplay; fullscreen"
        sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
        width="100%"
        height="100%"
        key={refreshKey}
      />
    );
  }

  if (stream.is_chat)
    return (
      <TwitchChat
        channel={stream.twitch_name}
        darkMode={actualTheme === "dark"}
        height="100%"
        width="100%"
      />
    );

  return (
    <ReactPlayer
      className="!h-full !w-full"
      url={`https://player.twitch.tv/${stream.twitch_name}`}
      config={{
        twitch: {
          options: {
            theme: actualTheme,
          },
        },
        youtube: {
          playerVars: {
            autoplay: true,
          },
        },
      }}
      muted={!sound}
      playing
      controls
      key={refreshKey}
    />
  );
}
