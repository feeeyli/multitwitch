"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useRenderStreamers } from "@/hooks/selector-dialog/use-render-streamers";
import { useSearch } from "@/hooks/selector-dialog/use-search";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { SearchBar } from "./search-bar";
import { SelectStreamers } from "./select-streamers";
import { SortStreamers } from "./sort-streamers";
import { StreamersList } from "./streamers-list";

export function StreamersTab() {
  const searchResult = useSearch();
  const searchMode = useStreamersSearchStore((state) => state.mode);
  const favoriteStreamers = useStore(
    useFavoritesStore,
    (state) => state.favoriteStreamers
  );
  const pinnedStreamers = useStore(
    useCustomDataStore,
    (state) => state.pinnedStreamers
  );

  const render = useRenderStreamers(
    favoriteStreamers ?? [],
    pinnedStreamers ?? []
  );
  const renderAwait =
    typeof favoriteStreamers === "undefined" ||
    typeof pinnedStreamers === "undefined";

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
      <StreamersList {...searchResult} {...{ render, renderAwait }} />
    </TabsContent>
  );
}
