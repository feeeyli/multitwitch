import { GroupWithHideSchema } from "@/stores/selector-store";
import { StreamerSchema } from "@/types/streamer.schema";

type FormatSelectedListParams = {
  streamers?: StreamerSchema[];
  groups?: GroupWithHideSchema[];
};

export function formatSelectedList({
  streamers = [],
  groups = [],
}: FormatSelectedListParams) {
  const streamersNames = streamers.map((streamer) => streamer.display_name);

  const groupsNames = groups.map((group) => {
    if (group.hided_members.length === 0) return group.display_name;

    return `${group.display_name} (-${group.hided_members
      .map((member, index) => {
        if (index === 3) return "...";

        return member.display_name;
      })
      .slice(0, 4)
      .join(" -")})`;
  });

  return [streamersNames, groupsNames].flat().join(", ");
}
