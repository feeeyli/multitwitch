import { env } from "@/env";
import { QSMP_SKIN_HEADS } from "./skin-heads/qsmp";

const skinHeadsVariants = {
  qsmp: QSMP_SKIN_HEADS,
  frogg: {},
  purgatory: {},
  twitch: {},
};

export const SKIN_HEADS = skinHeadsVariants[env.APP_VARIANT] as {
  [skin: string]: string;
};

export const SKIN_HEAD = (skin: string, fallback?: string) => {
  const head = SKIN_HEADS[skin];

  if (!head)
    return (
      fallback ?? "https://placehold.co/300x300/281f37/f9fafb.png?text=O_O"
    );

  return head;
};
