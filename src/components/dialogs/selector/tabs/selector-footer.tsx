"use client";

import { DialogFooter } from "@/components/ui/dialog";
import { useSelectorStore } from "@/stores/selector-store";

export function SelectorFooter() {
  const selected = useSelectorStore((state) => state);

  return (
    <DialogFooter>
      {[
        selected.selectedStreamers.map((selec) => selec.display_name),
        selected.selectedGroups.map(
          (selec) =>
            selec.display_name +
            " -" +
            selec.hided_members.map((hm) => hm.display_name).join("- ")
        ),
      ]
        .flat()

        .join(", ")}
    </DialogFooter>
  );
}
