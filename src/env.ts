import { z } from "zod";

const envSchema = z
  .object({
    NEXT_PUBLIC_APP_VARIANT: z.enum(["twitch", "qsmp", "purgatory", "frogg"]),
  })
  .transform((value) => ({
    APP_VARIANT: value.NEXT_PUBLIC_APP_VARIANT,
  }));

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_VARIANT: process.env.NEXT_PUBLIC_APP_VARIANT,
});
