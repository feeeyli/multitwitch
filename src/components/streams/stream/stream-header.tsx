import { useSettings } from "@/hooks/use-settings";
import { Root as ToolbarRoot } from "@radix-ui/react-toolbar";
import { useTranslations } from "next-intl";
import { useStream } from "./stream";
import { headerItemsComponents } from "./stream-header-items";

export function StreamHeader() {
  const { settings } = useSettings();
  const { stream } = useStream();
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
        {!stream.is_chat &&
          headerItems.map((name) => {
            if (!settings.streams.headerItems.includes(name)) return null;

            const Item = headerItemsComponents[name];
            return <Item key={name} />;
          })}
        <div className="drag-handle flex-grow min-h-7 sm:min-h-3.5"></div>
      </header>
    </ToolbarRoot>
  );
}
