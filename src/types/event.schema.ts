import { z } from "zod";

const announcementSchema = z.object({
  text: z.string(),
  pictures: z.array(z.string()),
  link: z.string().url(),
  publisher: z.object({
    picture: z.string(),
    name: z.string(),
    username: z.string(),
  }),
});

const eventSchema = z.object({
  name: z.string(),
  time: z.date(),
  announcements: z.array(announcementSchema),
});

export type EventSchema = z.infer<typeof eventSchema>;

export type AnnouncementSchema = z.infer<typeof announcementSchema>;
