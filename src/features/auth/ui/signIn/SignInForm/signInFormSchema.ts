import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Required")
    .email("Неверный адрес электронной почты"),
  password: z
    .string()
    .min(1, "Required")
    .min(6, "Минимум 6 символов")
    .max(20, "Максимум 20 символов")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
      "Пароль должен содержать 0-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}",
    ),
});
export type LoginFields = z.infer<typeof LoginSchema>;
