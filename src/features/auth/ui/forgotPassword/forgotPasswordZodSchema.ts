import { z } from "zod";

export type ForgotPasswordZodSchemaFields = z.infer<
  typeof ForgotPasswordZodSchema
>;
export const ForgotPasswordZodSchema = z.object({
  email: z.string().email("The email must match the format epam@epam.com"),
});
