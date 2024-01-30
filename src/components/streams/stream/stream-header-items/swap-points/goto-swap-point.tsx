import { GoToSwapPoint as GoToSwapPointIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLayoutStorageStore } from "@/stores/layout-storage-store";
import { Button as ToolbarButton } from "@radix-ui/react-toolbar";
import { useTranslations } from "next-intl";
import { useStream } from "../../stream";

export function GotoSwapPoint() {
  const t = useTranslations("streams.stream-header");
  const { stream, layout } = useStream();
  const { swapStreams, setLayout, getSwapPoints } = useLayoutStorageStore();

  const isSwapPointActive = getSwapPoints().includes(
    stream.twitch_name + (stream.is_chat ? "-chat" : "")
  );

  if (isSwapPointActive || getSwapPoints().length === 0) return null;

  return (
    <DropdownMenu>
      <ToolbarButton asChild>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="xs"
            className="hover:bg-muted-foreground/5 hover:text-muted-foreground"
            title={t("swap-points")}
          >
            <GoToSwapPointIcon size="1rem" variant={0} />
          </Button>
        </DropdownMenuTrigger>
      </ToolbarButton>
      <DropdownMenuContent className="flex-row min-w-[unset]" side="top">
        {getSwapPoints().map((name, number) => (
          <DropdownMenuItem
            key={name}
            onClick={() => {
              setLayout(swapStreams(layout, name, stream.twitch_name));
            }}
            title={t("goto-swap-point", {
              number: number + 1,
              name: name.charAt(0).toUpperCase() + name.slice(1),
            })}
          >
            <GoToSwapPointIcon
              size="1rem"
              variant={number + 1}
              className="mr-2"
            />
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
