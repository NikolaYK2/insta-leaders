import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Required').email('Неверный адрес электронной почты'),
  password: z.string().min(1, 'Required').min(3, 'Минимум 3 символа'),
})
export type LoginFields = z.infer<typeof LoginSchema>
