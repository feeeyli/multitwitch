import { env } from "@/env";
import { QSMP_GROUPS } from "./groups/qsmp";

const groupsVariants = {
  qsmp: QSMP_GROUPS,
  frogg: [],
  purgatory: [],
  twitch: [],
};

export const GROUPS = groupsVariants[env.APP_VARIANT];
