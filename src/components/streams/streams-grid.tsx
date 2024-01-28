import { useGridSize } from "@/hooks/streams/use-grid-size";
import { useLayoutPresets } from "@/hooks/streams/use-layout-presets";
import { useStreamsList } from "@/hooks/streams/use-streams-list";
import useStore from "@/hooks/use-store";
import { useLayoutStorageStore } from "@/stores/layout-storage-store";
import { useMemo } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useElementSize, useMediaQuery } from "usehooks-ts";
import { Stream } from "./stream/stream";

export function StreamsGrid() {
  const isDesktop = !useMediaQuery("(max-width: 640px)");
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const layoutStorage = useStore(useLayoutStorageStore, (state) => state);
  const streamsList = useStreamsList();
  const { columns, rows } = useGridSize(streamsList.length, isDesktop);
  const [containerRef, containerSize] = useElementSize();
  const presets = useLayoutPresets(
    columns,
    rows,
    Math.ceil(containerSize.height / 36 / rows) * rows
  );

  if (!layoutStorage) return null;

  return (
    <div ref={containerRef} className="h-full">
      <ReactGridLayout
        layout={presets.tiles(presets.generateBlankLayout(streamsList))}
        cols={10 * columns}
        rowHeight={
          containerSize.height /
            (Math.ceil(containerSize.height / 36 / rows) * rows) -
          4.2
        }
        resizeHandles={["sw", "se"]}
        draggableHandle=".drag-handle"
        margin={[4, 4]}
      >
        {streamsList.map((stream) => {
          return (
            <div
              className="rounded-md overflow-hidden flex flex-col"
              key={stream.twitch_name + (stream.is_chat ? "-chat" : "")}
            >
              <Stream stream={stream} />
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
}
