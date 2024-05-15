import * as z from "zod";

export const FormSchema = z.object({
    firstName: z.string().min(1, "Este campo es obligatorio"),
    lastName: z.string().min(1, "Este campo es obligatorio"),
    phoneNumber: z.string().min(8, "El número de teléfono debe tener al menos 8 números"),
    email: z.string().min(1, "Este campo es obligatorio").email("E-mail inválido"),
    password: z.string().min(8, "La contraseña debe tener más de 8 caracteres"),
    confirmPassword: z.string().min(1, "Este campo es obligatorio"),
    rememberMe: z.boolean().optional(), // Agrega el campo rememberMe al esquema
    terms: z.boolean().refine((val) => val, {
        message: "Debes aceptar los términos y condiciones",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
});