'use server';

import { AddPlayerSchema } from '../schemas/players.schema';
import { FormState } from '../types/form.type';
import { parseFormData } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPlayer(
	state: any,
	data: FormData
): Promise<FormState> {
	const parsedData = parseFormData(data, AddPlayerSchema);
	if (parsedData.fieldErrors) return parsedData as FormState;

	const url = new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/players`);
	const token = data.get('token');

	const { playerName, birthDate } = parsedData.fieldValues;

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				playerName,
				birthDate,
			}),
		});

		if (!res.ok) {
			return {
				reqError: 'Error inesperado, por favor intenta de nuevo',
				fieldValues: { playerName, birthDate },
			};
		}
	} catch (e: any) {
		return { reqError: e.message, fieldValues: { playerName, birthDate } };
	}

	revalidatePath('/players');
	redirect('/players');
}
