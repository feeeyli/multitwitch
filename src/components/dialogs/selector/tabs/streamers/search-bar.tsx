import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/env";
import { useStreamersSearchStore } from "@/stores/streamers-search-store";
import { Globe2, Twitch, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function SearchBar() {
  const search = useStreamersSearchStore();
  const t = useTranslations("selector-dialog.tabs.streamers-tab");

  const searchTypeName =
    search.mode === "twitch"
      ? "twitch"
      : env.APP_VARIANT === "twitch"
      ? "pinned"
      : "static";

  return (
    <div className="flex flex-grow gap-2">
      <div className="flex w-full">
        <Label className="sr-only" htmlFor="streamer-search">
          {t("streamer-search-label", {
            type: searchTypeName,
          })}
        </Label>
        <Input
          value={search.search ?? ""}
          onChange={(e) => search.setSearch(e.target.value)}
          placeholder={t("streamer-search-label", {
            type: searchTypeName,
          })}
          className="h-9 rounded-r-none border-r-0"
          id="streamer-search"
          name="streamer-search"
        />
        <Button
          variant="outline"
          className="rounded-l-none border-l-0 px-3 text-muted-foreground"
          size="sm"
          onClick={() => search.setSearch("")}
        >
          <XCircle size="1rem" />
        </Button>
      </div>
      <Button onClick={() => search.toggleMode()} variant="outline" size="sm">
        {search.mode === "static" && <Globe2 size="1rem" />}
        {search.mode === "twitch" && <Twitch size="1rem" />}
      </Button>
    </div>
  );
}
