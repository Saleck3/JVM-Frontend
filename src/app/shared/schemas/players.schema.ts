import { z } from 'zod';

export const AddPlayerSchema = z.object({
	playerName: z.string().min(2, 'Elige un nombre de jugador'),
	birthDate: z
		.string({ required_error: 'Elige una fecha de nacimiento' })
		.refine((value) => {
			const date = new Date(value);
			const minYear = new Date('1900-01-01');

			return date.getTime() > minYear.getTime();
		}, 'El jugador debe haber nacido despues de 1900')
		.refine((value) => {
			const date = new Date(value);
			const maxYear = new Date();
			maxYear.setFullYear(maxYear.getFullYear() - 3);

			return date.getTime() < maxYear.getTime();
		}, 'El jugador debe tener 3 años o más'),
});

export type AddPlayerType = z.infer<typeof AddPlayerSchema>;
export type AddPlayerErrors = z.inferFormattedError<typeof AddPlayerSchema>;
