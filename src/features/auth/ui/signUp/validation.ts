import { z } from 'zod'

export type SignUpFields = z.infer<typeof signUpSchema>
export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
    email: z.string().email('The email must match the format epam@epam.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20'),
    passwordConfirmation: z.string(),
    agreesToTOS: z.boolean().refine(val => val, {
      message: 'You have to accept our terms of service',
    }),
  })
  .refine(value => value.password === value.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
