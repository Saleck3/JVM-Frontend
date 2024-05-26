import { appleType } from "../types/apple.type";

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

		return applesAdapter(data);
	} catch (e: any) {
		console.error('modules service error', e.message);
	}
};



function applesAdapter(data: any): [appleType] {
	const datosBack = data.data.apples;
	const applesArray: [appleType] = datosBack.map((unformattedApple: any) => ({
		id: unformattedApple.id,
		name: unformattedApple.name,
		stars: unformattedApple.stars
	}));
	return applesArray;
}