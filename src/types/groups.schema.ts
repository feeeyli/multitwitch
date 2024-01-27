import { z } from "zod";

const groupSchema = z.object({
  display_name: z.string(),
  simple_name: z.string(),
  members: z.array(
    z.object({
      display_name: z.string(),
      twitch_name: z.string(),
      avatar_url: z.string().nullable(),
    })
  ),
  default_group: z.boolean(),
});

export type GroupSchema = z.infer<typeof groupSchema>;

/*

display_name: "English speakers",
    simple_name: "english",
    members: [
      {
        display_name: "BadBoyHalo",
        twitch_name: "BadBoyHalo",
      },
*/
