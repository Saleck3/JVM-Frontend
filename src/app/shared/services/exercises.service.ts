import { getLectiData, getToken } from '@/lib/sessionUtils';
import { adaptExercises, adaptScore } from '../adapters/exercises.adapter';

export const getExercises = async (appleId: string) => {
	const { token, currentPlayer } = await getLectiData()!;

	const query = new URLSearchParams({
		playerId: currentPlayer!.id,
		appleId,
	}).toString();
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises?${query}`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('getExercises error: ', data);
			throw new Error(
				`getExercises res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}

		const data = await res.json();
		const exercises = adaptExercises(data);

		return exercises;
	} catch (e: any) {
		console.error('exercises service error', e.message);
	}
};

export const getTest = async () => {
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/test`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('getExercises error: ', data);
			throw new Error(
				`getTest res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}

		const data = await res.json();
		const exercises = adaptExercises(data);

		return exercises;
	} catch (e: any) {
		console.error('exercises service error', e.message);
	}
};

export const scoreExercises = async (
	appleId: string,
	gameErrors: number[]
): Promise<any> => {
	const { token, currentPlayer } = await getLectiData()!;
	const query = new URLSearchParams({
		playerId: currentPlayer!.id,
		appleId,
	}).toString();

	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises/score?${query}`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ gameErrors }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('scoreExercises error: ', data);
			throw new Error(
				`scoreExercises res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}
		const data = await res.json();
		return adaptScore(data);
	} catch (e: any) {
		console.error('score service error', e.message);
	}
};

export const scoreVoice = async (
	audio: Blob,
	exerciseId: string
): Promise<any> => {
	const query = new URLSearchParams({ exerciseId }).toString();
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises/voice/score?${query}`;
	const token = await getToken();

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: audio,
			headers: {
				'Content-Type': 'audio/mp3',
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('scoreExercises error: ', data);
			throw new Error(
				`scoreVoice res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}

		const data = await res.json();
		return data;
	} catch (e: any) {
		console.error('score voice service error', e.message);
	}
};

export const scoreTest = async (gameErrors: boolean[]): Promise<any> => {
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/test/score`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ gameErrors }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (!res.ok) {
			const data = res.headers.get('content-type') ? await res.json() : null;

			console.error('scoreTest error: ', data);
			throw new Error(
				`scoreTest res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}
		const data = await res.json();
		return data;
	} catch (e: any) {
		console.error('score service error', e.message);
	}
};
