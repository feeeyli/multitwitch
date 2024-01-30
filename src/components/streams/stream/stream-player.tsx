import { useTheme } from "next-themes";
import ReactPlayer from "react-player";
import { TwitchChat } from "react-twitch-embed";
import { useStream } from "./stream";

export function StreamPlayer() {
  const { stream, sound, refreshKey } = useStream();
  const { theme, systemTheme } = useTheme();

  const actualTheme = theme === "system" ? systemTheme : theme;

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
      }}
      muted={!sound}
      playing
      controls
      key={refreshKey}
    />
  );
}
