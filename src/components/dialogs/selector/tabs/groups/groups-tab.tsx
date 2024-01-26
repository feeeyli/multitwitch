import { TabsContent } from "@/components/ui/tabs";
import { GroupsList } from "./groups-list";
import { SearchBar } from "./search-bar";
import { SelectGroups } from "./select-groups";

export function GroupsTab() {
  return (
    <TabsContent value="groups">
      <header className="w-full mb-3 flex gap-3">
        <SelectGroups />
        <SearchBar />
      </header>
      <GroupsList />
    </TabsContent>
  );
}
