'use server';

import { getPlayers, getToken, updateLectiData } from '@/lib/sessionUtils';
import { AddPlayerSchema } from '../schemas/players.schema';
import { FormState } from '../types/form.type';
import { parseFormData } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Player } from '../types/user.type';

export async function createPlayer(
	state: any,
	data: FormData
): Promise<FormState> {
	const parsedData = parseFormData(data, AddPlayerSchema);
	if (parsedData.fieldErrors) return parsedData as FormState;

	const url = new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/players`);
	const token = await getToken();

	const { playerName, birthDate } = parsedData.fieldValues;

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
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

		const newPlayer = {
			playerName,
			birthDate,
			totalCrowns: 0,
		} as Player;

		const currentPlayers = await getPlayers();
		const updatedPlayers = [...currentPlayers, newPlayer];

		updateLectiData({ players: updatedPlayers });
	} catch (e: any) {
		return { reqError: e.message, fieldValues: { playerName, birthDate } };
	}

	revalidatePath('/players');
	redirect('/players');
}
