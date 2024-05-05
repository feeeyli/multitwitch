import { useFavoritesStore } from "@/stores/favorites-store";
import { GroupSchema } from "@/types/groups.schema";
import { ReactNode } from "react";
import useStore from "../use-store";

type ArrayNames = "favorite" | "default" | "non-default";

export function useRenderGroups(): (
  groups: GroupSchema[],
  separator: (index: number) => ReactNode,
  arrayRender: (groups: GroupSchema[], name: ArrayNames) => ReactNode
) => (ReactNode | GroupSchema[])[] {
  const favoriteGroupsStorage = useStore(
    useFavoritesStore,
    (state) => state.favoriteGroups
  );

  function filter(groups: GroupSchema[], filterArray: string[]) {
    const hasPassed = groups.filter((group) =>
      filterArray.some((filter) => group.simple_name === filter)
    );

    return [
      hasPassed,
      groups.filter(
        (group) =>
          !hasPassed.some((passed) => passed.simple_name === group.simple_name)
      ),
    ];
  }

  function render(
    groups: GroupSchema[],
    separator: (index: number) => ReactNode,
    arrayRender: (groups: GroupSchema[], name: ArrayNames) => ReactNode
  ) {
    const arrays = split(groups);

    const hasSeparator = (next: GroupSchema[], ...before: GroupSchema[][]) =>
      next.length > 0 && before.some((item) => item.length > 0);

    const withSeparators = arrays.map((array, i) => {
      const itemsBefore = arrays.slice(0, i);

      if (itemsBefore.length === 0)
        return [arrayRender(array.groups, array.name as ArrayNames)];

      return hasSeparator(
        array.groups,
        ...itemsBefore.map((item) => item.groups)
      )
        ? [separator(i), arrayRender(array.groups, array.name as ArrayNames)]
        : [arrayRender(array.groups, array.name as ArrayNames)];
    });

    return withSeparators.flat(1);
  }

  function split(groups: GroupSchema[]) {
    const favoriteGroups = filter(groups, favoriteGroupsStorage ?? []);

    const defaultGroups = favoriteGroups[1].filter(
      (streamer) => streamer.default_group
    );

    const nonDefaultGroups = favoriteGroups[1].filter(
      (streamer) => !streamer.default_group
    );

    return [
      { name: "favorite", groups: favoriteGroups[0] },
      defaultGroups.length > 0
        ? { name: "default", groups: defaultGroups }
        : undefined,
      {
        name: "non-default",
        groups: nonDefaultGroups,
      },
    ].filter(Boolean) as {
      name: string;
      groups: {
        display_name: string;
        simple_name: string;
        members: {
          display_name: string;
          twitch_name: string;
          avatar_url: string | null;
        }[];
        default_group: boolean;
      }[];
    }[];
  }

  return render;
}
