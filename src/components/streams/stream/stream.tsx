import { StreamSchema } from "@/hooks/streams/use-streams-list";
import { createContext, useContext, useState } from "react";
import { StreamHeader } from "./stream-header";

type StreamContextSchema = {
  sound: boolean;
  fullScreen: boolean;
  refreshKey: number;

  setSound: (value: boolean) => void;
  setFullScreen: (value: boolean) => void;
  refresh: () => void;

  stream: StreamSchema;
};

const StreamContext = createContext({} as StreamContextSchema);

export const useStream = () => useContext(StreamContext);

// eslint-disable-next-line @typescript-eslint/ban-types
type StreamProps = {
  stream: StreamSchema;
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
      }}
    >
      <StreamHeader />
      <div className="flex-grow bg-red-950 p-4">
        <pre>
          {JSON.stringify({ ...props.stream, ...streamsControls }, null, 2)}
        </pre>
      </div>
    </StreamContext.Provider>
  );
}
