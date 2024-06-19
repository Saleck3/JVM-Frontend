import { getLectiData } from '@/lib/sessionUtils';
import { adaptApples } from '../adapters/apples.adapter';

export const getApples = async (moduleId: string) => {
	const { token, currentPlayer } = await getLectiData()!;

	const query = new URLSearchParams({
		playerId: currentPlayer!.id,
		moduleId,
	}).toString();

	const url = `${process.env.FRONTEND_URL}/api/apples/?${query}`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) {
			const error = await res.json();

			console.error('Apples service request error: ', error);
			throw new Error(
				`"Apples service request error: ${error.type} - ${error.message}"`
			);
		}

		const apples = await res.json();
		return adaptApples(apples);
	} catch (e: any) {
		console.error('Apples service internal error: ', e.message);
		throw new Error(`Apples service internal error: ${e.message}`);
	}
};
