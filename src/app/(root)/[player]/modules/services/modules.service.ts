export const getModules = async (playerId: string, token: string) => {
	const query = new URLSearchParams({ playerId }).toString();
	const url = `${process.env.FRONTEND_URL}/api/modules?${query}`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const { data } = await res.json();

		return data.modules;
	} catch (e: any) {
		console.error('modules service error', e.message);
	}
};
