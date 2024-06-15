import { z } from "zod";


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
          currentDate.getFullYear() - 3,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        const dateOfBirth = new Date(dateString);
        return dateOfBirth >= minDate && dateOfBirth <= maxDate;
      },
      {
        message:
          "La fecha de nacimiento debe estar entre 1900 y 3 años antes del año actual.",
      }
    ),
  });
  