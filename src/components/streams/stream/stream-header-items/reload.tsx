import { Toggle } from "@/components/ui/toggle";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { useAnimate } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useStream } from "../stream";

export function Reload() {
  const t = useTranslations("streams.stream-header");
  const { refresh } = useStream();
  const [scope, animate] = useAnimate();

  return (
    <ToolbarButton asChild>
      <Toggle
        variant="ghost"
        size="xs"
        ref={scope}
        pressed
        onClick={() => {
          animate([
            ["svg", { rotate: -180 }, { duration: 0.4 }],
            ["svg", { rotate: 0 }, { duration: 0.00000000001 }],
          ]);

          refresh();
        }}
        title={t("reload")}
      >
        <RefreshCcw size="1rem" />
      </Toggle>
    </ToolbarButton>
  );
}
