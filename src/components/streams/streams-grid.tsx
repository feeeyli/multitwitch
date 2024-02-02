import { useGridSize } from "@/hooks/streams/use-grid-size";
import { useLayoutPresets } from "@/hooks/streams/use-layout-presets";
import { useStreamsList } from "@/hooks/streams/use-streams-list";
import useStore from "@/hooks/use-store";
import { useLayoutStorageStore } from "@/stores/layout-storage-store";
import { useMemo, useState } from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { useMediaQuery } from "usehooks-ts";
import { Stream } from "./stream/stream";

const compareLayouts = (arr1: Layout[], arr2: Layout[]): boolean =>
  arr1.length === arr2.length &&
  arr1.every((item1) =>
    arr2.some(
      (item2) =>
        item1.i === item2.i &&
        item1.x === item2.x &&
        item1.y === item2.y &&
        item1.w === item2.w &&
        item1.h === item2.h
    )
  );

export function StreamsGrid() {
  const isDesktop = !useMediaQuery("(max-width: 640px)");
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const layoutStorage = useStore(useLayoutStorageStore, (state) => state);
  const streamsList = useStreamsList();
  const { columns, rows } = useGridSize(streamsList.length, isDesktop);
  const presets = useLayoutPresets(
    columns,
    rows,
    Math.ceil(window.innerHeight / 36 / rows) * rows
  );
  const [isMoving, setIsMoving] = useState(false);

  const initialLayout = presets.tiles(presets.generateBlankLayout(streamsList));

  if (!layoutStorage) return null;

  const layout =
    layoutStorage.getLayout().length > 0
      ? layoutStorage.getLayout()
      : initialLayout;

  const actions = {
    start() {
      setIsMoving(true);
    },
    stop() {
      setIsMoving(false);
    },
  };

  return (
    <div className="h-full w-full">
      <ReactGridLayout
        layout={layout}
        onLayoutChange={(lay) => {
          if (
            lay.every((item) => item.h === 0 && item.y === 0) ||
            lay.some((item) => item.h === 1 && item.w === 1) ||
            compareLayouts(lay, initialLayout)
          )
            return;

          layoutStorage.setLayout(lay);
        }}
        cols={10 * columns}
        rowHeight={
          window.innerHeight /
            (Math.ceil(window.innerHeight / 36 / rows) * rows) -
          4.2
        }
        resizeHandles={["sw", "se"]}
        draggableHandle=".drag-handle"
        margin={[4, 4]}
        onDragStart={actions.start}
        onResizeStart={actions.start}
        onDragStop={actions.stop}
        onResizeStop={actions.stop}
      >
        {streamsList.map((stream) => {
          return (
            <div
              className="rounded-md overflow-hidden flex flex-col relative"
              key={stream.twitch_name + (stream.is_chat ? "-chat" : "")}
            >
              <Stream stream={stream} layout={layout} isMoving={isMoving} />
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
}
