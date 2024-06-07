import { adaptApples } from '../adapters/apples.adapter';

export const getApples = async (
	playerId: string,
	moduleId: string,
	token: string
) => {
	const query = new URLSearchParams({ playerId, moduleId }).toString();
	const url = `${process.env.FRONTEND_URL}/api/apples/?${query}`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('getApples error: ', data);
			throw new Error(
				`getApples res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}

		const apples = await res.json();
		return adaptApples(apples);
	} catch (e: any) {
		console.error('apples service error', e.message);
	}
};
