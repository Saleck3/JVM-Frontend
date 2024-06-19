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

		const modules = await res.json();
		return adaptModules(modules);
	} catch (e: any) {
		console.error('modules service error', e.message);
	}
};
