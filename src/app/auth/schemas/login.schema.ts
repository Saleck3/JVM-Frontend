import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().trim().min(1, "Este campo es obligatorio").email("E-mail inválido"),
    password: z.string().trim().min(1, "Este campo es obligatorio"),
    rememberMe: z.boolean().optional(),
});