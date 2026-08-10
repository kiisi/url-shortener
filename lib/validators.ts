import { z } from "zod";

export const CreateLinkSchema = z.object({
  url: z.url("Please enter a valid URL."),
  alias: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Alias must be at least 5 characters.")
    .regex(
      /^[a-zA-Z0-9_-]*$/,
      "Alias can only contain letters, numbers, hyphens and underscores."
    )
    .optional(),
  expirationDate: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        return new Date(value).getTime() > Date.now();
      },
      {
        message: "Expiration date must be in the future.",
      }
    ),
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;