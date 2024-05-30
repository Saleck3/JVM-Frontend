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
		const data = await res.json();
		return data;
	} catch (e: any) {
		console.error('apples service error', e.message);
	}
};
