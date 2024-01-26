import { env } from "@/env";
import { FROGG_STREAMERS } from "./streamers/frogg";
import { PURGATORY_STREAMERS } from "./streamers/purgatory";
import { QSMP_STREAMERS } from "./streamers/qsmp";

const streamersVariants = {
  qsmp: QSMP_STREAMERS,
  frogg: FROGG_STREAMERS,
  purgatory: PURGATORY_STREAMERS,
  twitch: [],
};

export const STREAMERS = streamersVariants[env.APP_VARIANT];
