import { z } from "zod";

const commonStreamerSchema = z.object({
  display_name: z.string(),
  twitch_name: z.string(),
  avatar_url: z.string().url(),
  default_streamer: z.boolean(),
});

const noDataStreamerSchema = commonStreamerSchema.extend({
  no_data: z.literal(true),
  youtube_stream: z.boolean().optional(),
});

const withDataStreamerSchema = commonStreamerSchema
  .extend({
    no_data: z.literal(false),
    is_live: z.literal(false),
  })
  .or(
    commonStreamerSchema.extend({
      no_data: z.literal(false),
      is_live: z.literal(true),
      is_playing: z.boolean().optional(),
      title: z.string(),
      language: z.string(),
    })
  );

const streamerSchema = noDataStreamerSchema.or(withDataStreamerSchema);

export type StreamerSchema = z.infer<typeof streamerSchema>;
