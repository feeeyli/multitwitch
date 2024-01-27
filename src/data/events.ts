import { env } from "@/env";
import { FROGG_EVENTS } from "./events/frogg";

const eventsVariants = {
  qsmp: [],
  frogg: FROGG_EVENTS,
  purgatory: [],
  twitch: [],
};

export const EVENTS = eventsVariants[env.APP_VARIANT];
