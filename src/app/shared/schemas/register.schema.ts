import { z } from "zod";

export const FormDataSchema = z
  .object({
    first_name: z.string().min(2, "El nombre es obligatorio"),
    last_name: z.string().min(2, "El apellido es obligatorio"),
    email: z
      .string()
      .email("Formato de email incorrecto")
      .min(4, "No olvides tu email"),
    player_name: z.string().min(2, "Debes elegir un nombre de jugador"),
    password: z.string().min(8, "La clave debe contener al menos 8 caracteres"),
    repeatPassword: z.string().min(8, "Las claves deben coincidir"),
    terms: z
      .preprocess((x) => x === "on", z.boolean())
      .refine((val) => val === true, {
        message: "Debes aceptar los términos y condiciones",
      }),
    recommendedModule: z.string(),
    general: z.void()
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Las contraseñas no coinciden",
  });

export const FormAddPlayerSchema = z.object({
  player_name: z.string().min(2, "Debes elegir un nombre de jugador"),
  birth_date: z.string().refine(
    (dateString) => {
      const currentDate = new Date();
      const minDate = new Date(
        currentDate.getFullYear() - 120,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const maxDate = new Date(
        currentDate.getFullYear() - 5,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const dateOfBirth = new Date(dateString);
      return dateOfBirth >= minDate && dateOfBirth <= maxDate;
    },
    {
      message:
        "La fecha de nacimiento debe estar entre 1900 y 5 años antes de la fecha actual.",
    }
  ),
});
