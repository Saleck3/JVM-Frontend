import { getToken } from '@/lib/sessionUtils';
import adaptModules from '../adapters/modules.adapter';

export const getModules = async (playerId: string) => {
	const query = new URLSearchParams({ playerId }).toString();
	const url = `${process.env.FRONTEND_URL}/api/modules?${query}`;

	const token = await getToken();

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

			console.error('Modules service request error: ', error);
			throw new Error(
				`"Modules service request error: ${error.type} - ${error.message}"`
			);
		}

		const modules = await res.json();
		return adaptModules(modules);
	} catch (e: any) {
		console.error('Modules service internal error: ', e.message);
		throw new Error(`Modules service internal error: ${e.message}`);
	}
};
