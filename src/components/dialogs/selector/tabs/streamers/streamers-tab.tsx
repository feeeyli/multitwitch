"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSearch } from "@/hooks/selector-dialog/use-search";
import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { SearchBar } from "./search-bar";
import { SelectStreamers } from "./select-streamers";
import { SortStreamers } from "./sort-streamers";
import { StreamersList } from "./streamers-list";

export function StreamersTab() {
  const searchResult = useSearch();
  const searchMode = useStreamersSearchStore((state) => state.mode);

  return (
    <TabsContent value="streamers">
      <header className="w-full mb-3 flex gap-3">
        {searchMode === "static" && (
          <>
            <SelectStreamers StaticStreamers={searchResult.StaticStreamers} />
            <SortStreamers />
          </>
        )}
        <SearchBar />
      </header>
      <StreamersList {...searchResult} />
    </TabsContent>
  );
}
