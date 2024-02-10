import { useSettings } from "@/hooks/use-settings";
import { Root as ToolbarRoot } from "@radix-ui/react-toolbar";
import { useTranslations } from "next-intl";
import { getSpecialStreamer, useStream } from "./stream";
import { headerItemsComponents } from "./stream-header-items";

export function StreamHeader() {
  const { settings } = useSettings();
  const { stream, fullScreen } = useStream();
  const t = useTranslations("streams.stream-header");

  const headerItems = [
    "sound",
    "fullscreen",
    "chat",
    "swap-points",
    "reload",
    "remove-stream",
  ] as const;

  return (
    <ToolbarRoot aria-label={t("label")} asChild>
      <header className="bg-muted w-full cursor-move flex">
        <div
          data-maximized={fullScreen}
          className="data-[maximized=true]:absolute top-8 sm:top-[1.125rem] left-1 [&>button]:data-[maximized=true]:bg-background/20 [&>button]:data-[maximized=true]:hover:text-accent-foreground [&>button]:data-[maximized=true]:hover:bg-secondary/40"
        >
          {!stream.is_chat && (
            <>
              {!fullScreen &&
                headerItems
                  .filter((hi) => {
                    if (!getSpecialStreamer(stream.twitch_name)) return true;

                    if (
                      getSpecialStreamer(
                        stream.twitch_name
                      )!.hided_header_items.includes(hi)
                    )
                      return false;

                    return true;
                  })
                  .map((name) => {
                    if (!settings.streams.headerItems.includes(name))
                      return null;

                    const Item = headerItemsComponents[name];
                    return <Item key={name} />;
                  })}
              {fullScreen && <headerItemsComponents.fullscreen />}
            </>
          )}
        </div>
        <div className="drag-handle flex-grow min-h-7 sm:min-h-3.5"></div>
      </header>
    </ToolbarRoot>
  );
}
