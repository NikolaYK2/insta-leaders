import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(20, "Maximum number of characters 20"),
    passwordConfirmation: z.string(),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });
