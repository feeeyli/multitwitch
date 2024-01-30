import { Layout } from "react-grid-layout";

function split(arr: Layout[], perChunk: number): Layout[][] {
  return arr.reduce((all: Layout[][], one, i) => {
    const ch = Math.floor(i / perChunk);
    all[ch] = ([] as Layout[]).concat(all[ch] || [], one);
    return all;
  }, []);
}

type Streams = {
  twitch_name: string;
  group_name?: string;
  is_chat: boolean;
}[];

export function useLayoutPresets(
  cols: number,
  rows: number,
  rowsInScreen: number
): {
  focus: (layout: Layout[], focusedAmount?: 1 | 2 | 4) => Layout[];
  tiles: (layout: Layout[]) => Layout[];
  generateBlankLayout: (list: Streams) => Layout[];
} {
  function generateBlankLayout(list: Streams) {
    return list.map((stream) => ({
      i: stream.twitch_name + (stream.is_chat ? "-chat" : ""),
      w: 0,
      x: 0,
      h: 0,
      y: 0,
      minH: 0,
      minW: 0,
    })) as Layout[];
  }

  function focus(layout: Layout[], focusedAmount: 1 | 2 | 4 = 1) {
    const focused = layout.slice(0, focusedAmount);
    const layRows = split(layout.slice(focusedAmount), 6);

    if (layRows.length > 6) return layout;

    const unfocusedHeight = [5, 5, 4, 4, 3, 3][layRows.length - 1];
    const focusOptions = {
      1: { w: 1, h: 1 },
      2: { w: 0.5, h: 1 },
      4: { w: 0.5, h: 0.5 },
    };

    return [
      focused.map((focus, i) => {
        const w = cols * 10;
        const h = rowsInScreen - unfocusedHeight * layRows.length;

        return {
          ...focus,
          w: Math.floor(w * focusOptions[focusedAmount].w),
          x: w * (i % 2),
          h: Math.floor(h * focusOptions[focusedAmount].h),
          y: h * Math.floor(i / 2),
        };
      }),
      layRows.flatMap((row, ii) => {
        const diff =
          Math.ceil((cols * 10) / row.length) * row.length - cols * 10;

        return row.map((item, i) => {
          const w = Math.ceil((cols * 10) / row.length);
          const width = i > row.length - diff - 1 ? w - 1 : w;

          return {
            ...item,
            h: unfocusedHeight,
            y: unfocusedHeight * focusedAmount * (ii + 1),
            w: width,
            x: width * i,
          };
        });
      }),
    ].flat();
  }

  function tiles(layout: Layout[]): Layout[] {
    const layRows = split(layout, cols).reverse();

    const height = Math.floor(rowsInScreen / rows);

    return layRows.flatMap((row, ii) => {
      const diff = Math.ceil((cols * 10) / row.length) * row.length - cols * 10;

      return row.map((item, i) => {
        const w = Math.ceil((cols * 10) / row.length);

        return {
          ...item,
          h: height,
          y: rowsInScreen - height * (ii + 1),
          w: i > row.length - diff - 1 ? w - 1 : w,
          x: w * i,
        };
      });
    });
  }

  return { focus, tiles, generateBlankLayout };
}
