import * as z from "zod";

export const SignupSchema = z.object({
    firstName: z.string().trim().min(1, "Este campo es obligatorio"),
    lastName: z.string().trim().min(1, "Este campo es obligatorio"),
    phoneNumber: z
        .string()
        .min(8, "El número de teléfono debe tener al menos 8 números")
        .max(10, "El número de teléfono debe tener máximo 10 números")
        .regex(/^\d+$/, "El número de teléfono debe contener solo números"),
    email: z.string().trim().min(1, "Este campo es obligatorio").email("E-mail inválido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener más de 8 caracteres")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]+$/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"),
    confirmPassword: z.string().trim().min(1, "Este campo es obligatorio"),
    terms: z.boolean().refine((val) => val, {
        message: "Debes aceptar los términos y condiciones",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
});