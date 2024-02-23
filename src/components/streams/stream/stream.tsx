import { StreamSchema } from "@/hooks/streams/use-streams-list";
import { createContext, useContext, useState } from "react";
import { Layout } from "react-grid-layout";
import { StreamHeader } from "./stream-header";
import { StreamPlayer } from "./stream-player";

export const specialStreamers = {
  jdm2088: {
    stream_url: "https://play.afreecatv.com/jdm1197/embed",
    hided_header_items: ["sound", "chat"],
  },
  vkzm14: {
    stream_url: "https://play.afreecatv.com/vkzm14/embed",
    hided_header_items: ["sound", "chat"],
  },
};

export function getSpecialStreamer(twitch_name: string) {
  if (specialStreamers[twitch_name as keyof typeof specialStreamers]) {
    return specialStreamers[twitch_name as keyof typeof specialStreamers];
  }
}

type StreamContextSchema = {
  sound: boolean;
  fullScreen: boolean;
  refreshKey: number;

  setSound: (value: boolean) => void;
  setFullScreen: (value: boolean) => void;
  refresh: () => void;

  stream: StreamSchema;
  layout: Layout[];
};

const StreamContext = createContext({} as StreamContextSchema);

export const useStream = () => useContext(StreamContext);

type StreamProps = {
  stream: StreamSchema;
  layout: Layout[];
  isMoving: boolean;
};

export function Stream(props: StreamProps) {
  const [streamsControls, setStreamsControls] = useState({
    sound: false,
    fullScreen: false,
    refreshKey: 0,
  });

  const streamsControlsActions = {
    setSound(value: boolean) {
      setStreamsControls((old) => ({
        ...old,
        sound: value,
      }));
    },
    setFullScreen(value: boolean) {
      setStreamsControls((old) => ({
        ...old,
        fullScreen: value,
      }));
    },
    refresh() {
      setStreamsControls((old) => ({
        ...old,
        refreshKey: old.refreshKey > 0 ? 0 : 1,
      }));
    },
  };

  return (
    <StreamContext.Provider
      value={{
        ...streamsControls,
        ...streamsControlsActions,
        stream: props.stream,
        layout: props.layout,
      }}
    >
      <StreamHeader />
      <div
        className="flex-grow bg-background data-[is-moving=true]:pointer-events-none select-none"
        data-is-moving={props.isMoving}
      >
        {/* <pre>
          {JSON.stringify({ ...props.stream, ...streamsControls }, null, 2)}
        </pre> */}
        <StreamPlayer />
      </div>
    </StreamContext.Provider>
  );
}
