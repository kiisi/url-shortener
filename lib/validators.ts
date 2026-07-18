import { z } from "zod";

export const CreateLinkSchema = z.object({
  url: z.url(),
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;