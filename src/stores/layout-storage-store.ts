import { Layout } from "react-grid-layout";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function sort(arr: string[] | undefined) {
  if (typeof arr === "undefined") return undefined;

  return arr.sort((a, b) => a.localeCompare(b));
}

export function getKey<T = string>(ignoreChats?: boolean) {
  const searchParams = new URLSearchParams(location.search);

  const streamers = sort(searchParams.get("streamers")?.split("/"));
  const groups = sort(searchParams.get("groups")?.split("/"));
  const chats = sort(searchParams.get("chats")?.split("/"));

  return (`${streamers?.join("/") || ""}${streamers && groups ? "/" : ""}${
    groups?.join("/") || ""
  }` +
    (ignoreChats
      ? ""
      : `${chats && (groups || streamers) ? "/" : ""}${
          chats ? `$${chats?.join("$")}` : ""
        }`)) as T;
}

type SetFunc = (
  partial:
    | UseLayoutStorageStore
    | Partial<UseLayoutStorageStore>
    | ((
        state: UseLayoutStorageStore
      ) => UseLayoutStorageStore | Partial<UseLayoutStorageStore>),
  replace?: boolean | undefined
) => void;

const actions = {
  get(key: keyof UseLayoutStorageStore, getFunc: () => UseLayoutStorageStore) {
    const item = getFunc()[key];
    const urlKey = getKey<keyof typeof item>(key === "swapPoints");

    if (!urlKey || !item[urlKey]) return [];

    return item[urlKey];
  },
  add<T>(
    key: keyof UseLayoutStorageStore,
    value: T,
    setFunc: SetFunc,
    getFunc: () => UseLayoutStorageStore
  ) {
    const item = getFunc()[key];
    const urlKey = getKey<keyof typeof item>(key === "swapPoints");

    if (!urlKey) return;

    setFunc({
      [key]: {
        ...item,
        [urlKey]: [...(item[urlKey] ?? []), value],
      },
    });
  },
  remove<T>(
    key: keyof UseLayoutStorageStore,
    value: T,
    setFunc: SetFunc,
    getFunc: () => UseLayoutStorageStore
  ) {
    const item = getFunc()[key];
    const urlKey = getKey<keyof typeof item>(key === "swapPoints");

    if (!urlKey) return;

    const result = (item[urlKey] as T[]).filter((i) => i !== value);

    if (result.length === 0) {
      return setFunc({
        [key]: {
          ...item,
          [urlKey]: undefined,
        },
      });
    }

    setFunc({
      [key]: {
        ...item,
        [urlKey]: result,
      },
    });
  },
  set<T>(
    key: keyof UseLayoutStorageStore,
    value: T[],
    setFunc: SetFunc,
    getFunc: () => UseLayoutStorageStore
  ) {
    const item = getFunc()[key];
    const urlKey = getKey<keyof typeof item>(key === "swapPoints");

    if (!urlKey) return;

    if (value.length === 0) {
      return setFunc({
        [key]: {
          ...item,
          [urlKey]: undefined,
        },
      });
    }

    setFunc({ [key]: { ...getFunc()[key], [urlKey]: value } });
  },
};

type UseLayoutStorageStore = {
  layout: { [key: string]: Layout[] };
  swapPoints: { [key: string]: string[] };

  getLayout: () => Layout[];
  setLayout: (value: Layout[]) => void;

  getSwapPoints: () => string[];
  addSwapPoint: (value: string) => void;
  removeSwapPoint: (value: string) => void;
  setSwapPoints: (value: string[]) => void;
  swapStreams: (layout: Layout[], destiny: string, origin: string) => Layout[];
};

export const useLayoutStorageStore = create<UseLayoutStorageStore>()(
  persist(
    (set, get) => ({
      swapPoints: {},
      layout: {},

      getSwapPoints: () => actions.get("swapPoints", get),
      addSwapPoint: (value) => {
        actions.add("swapPoints", value, set, get);
      },
      removeSwapPoint: (value) => {
        actions.remove("swapPoints", value, set, get);
      },
      setSwapPoints: (value) => {
        actions.set("swapPoints", value, set, get);
      },
      swapStreams(layout, destiny, origin) {
        // swap the item in 'layout' that 'i' is destiny with the item in 'layout' that 'i' is origin
        const updatedLayout = layout.reduce((acc, item) => {
          if (item.i === destiny) {
            acc.push({ ...item, i: origin });
          } else if (item.i === origin) {
            acc.push({ ...item, i: destiny });
          } else {
            acc.push(item);
          }
          return acc;
        }, [] as Layout[]);

        const updatedSwapPoints = get()
          .getSwapPoints()
          .reduce((acc, item) => {
            if (item === destiny) {
              acc.push(origin);
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as string[]);

        actions.set("swapPoints", updatedSwapPoints, set, get);

        return updatedLayout;
      },

      getLayout: () => actions.get("layout", get),
      setLayout: (value) => {
        actions.set("layout", value, set, get);
      },
    }),
    {
      name: "@MultiTwitch/layout",
    }
  )
);
