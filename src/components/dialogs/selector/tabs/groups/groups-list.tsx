"use client";

import { CreateGroupDialog } from "@/components/dialogs/custom-groups/create-group-dialog";
import { EditGroupDialog } from "@/components/dialogs/custom-groups/edit-group-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { GROUPS } from "@/data/groups";
import { useRenderGroups } from "@/hooks/selector-dialog/use-render-groups";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useGroupsSearchStore } from "@/stores/groups-search-store";
import { useSelectorStore } from "@/stores/selector-store";
import { matchSorter } from "match-sorter";
import { Group, GroupFavoriteButton } from "./group";

export function GroupsList() {
  const selected = useSelectorStore((state) => state);
  const customData = useStore(useCustomDataStore, (state) => state);
  const search = useGroupsSearchStore();
  const render = useRenderGroups();

  return (
    <ScrollArea className="h-[24.5rem]" type="always">
      <ToggleGroup
        type="multiple"
        className="flex-wrap gap-3 py-2"
        value={selected.selectedGroups.map((group) => {
          return group.simple_name;
        })}
        onValueChange={(value) => {
          selected.setSelectedGroups(
            value.map((simple_name) => {
              const group = [customData?.customGroups ?? [], GROUPS]
                .flat()
                .find((group) => group.simple_name === simple_name)!;

              return {
                ...group,
                hided_members:
                  selected.selectedGroups.find(
                    (sg) => sg.simple_name === simple_name
                  )?.hided_members ?? [],
              };
            })
          );
        }}
      >
        {render(
          matchSorter(
            [GROUPS, customData?.customGroups ?? []].flat(),
            search.search,
            {
              keys: ["simple_name", "display_name"],
              baseSort: () => 0,
            }
          ),
          (index) => (
            <Separator key={"separator-" + index} />
          ),
          (groups, name) => {
            if (name === "non-default" && groups.length === 0)
              return <Separator key="separator-2" />;

            return groups.map((group) => (
              <Group group={group} key={group.simple_name}>
                <GroupFavoriteButton />
                {!group.default_group && (
                  <EditGroupDialog editing_group={group} />
                )}
              </Group>
            ));
          }
        )}
        <CreateGroupDialog />
      </ToggleGroup>
    </ScrollArea>
  );
}
