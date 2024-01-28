import { SettingsSchema } from "@/types/settings.schema";
import { Layout } from "react-grid-layout";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function sort(arr: string[] | undefined) {
  if (typeof arr === "undefined") return undefined;

  return arr.sort((a, b) => a.localeCompare(b));
}

export function getKey<T = string>() {
  const sett = localStorage.getItem("@MultiTwitch/settings");

  if (!sett) return undefined;

  const {
    state: { settings },
  } = JSON.parse(sett) as { state: { settings: SettingsSchema } };

  const searchParams = new URLSearchParams(location.search);

  const streamers = sort(searchParams.get("streamers")?.split("/"));
  const groups = sort(searchParams.get("groups")?.split("/"));
  const chats = sort(searchParams.get("chats")?.split("/"));

  return `${streamers?.join("/") || ""}${streamers && groups ? "/" : ""}${
    groups?.join("/") || ""
  }${chats && (groups || streamers) ? "/" : ""}${
    chats && settings.streams.movableChat
      ? `$${chats?.join("$")}`
      : chats
      ? "$chats$"
      : ""
  }` as T;
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
    const urlKey = getKey<keyof typeof item>();

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
    const urlKey = getKey<keyof typeof item>();

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
    const urlKey = getKey<keyof typeof item>();

    if (!urlKey) return;

    setFunc({
      [key]: {
        ...item,
        [urlKey]: (item[urlKey] as T[]).filter((i) => i !== value),
      },
    });
  },
  set<T>(
    key: keyof UseLayoutStorageStore,
    value: T,
    setFunc: SetFunc,
    getFunc: () => UseLayoutStorageStore
  ) {
    const item = getFunc()[key];
    const urlKey = getKey<keyof typeof item>();

    if (!urlKey) return;

    setFunc({ [key]: { ...getFunc()[key], [urlKey]: value } });
  },
};

type UseLayoutStorageStore = {
  layout: { [key: string]: Layout[] };
  swapPoints: { [key: string]: string[] };

  getLayout: () => string[];
  setLayout: (value: Layout[]) => void;

  getSwapPoints: () => string[];
  addSwapPoint: (value: string) => void;
  removeSwapPoint: (value: string) => void;
  setSwapPoints: (value: string[]) => void;
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
