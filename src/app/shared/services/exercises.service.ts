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
			const error = await res.json();

			console.error('Exercises service request error: ', error);
			throw new Error(
				`"Exercises service request error: ${error.type} - ${error.message}"`
			);
		}

		const data = await res.json();
		return adaptExercises(data);
	} catch (e: any) {
		console.error('Exercises service internal error: ', e.message);
		throw new Error(`Exercises service internal error: ${e.message}`);
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
			const error = await res.json();

			console.error('Exercises service request error: ', error);
			throw new Error(
				`"Exercises service request error: ${error.type} - ${error.message}"`
			);
		}

		const data = await res.json();
		const exercises = adaptExercises(data);

		return exercises;
	} catch (e: any) {
		console.error('Exercises service internal error: ', e.message);
		throw new Error(`Exercises service internal error: ${e.message}`);
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
			const error = await res.json();

			console.error('Exercises service request error: ', error);
			throw new Error(
				`"Exercises service request error: ${error.type} - ${error.message}"`
			);
		}

		const data = await res.json();
		return adaptScore(data);
	} catch (e: any) {
		console.error('Exercises service internal error: ', e.message);
		throw new Error(`Exercises service internal error: ${e.message}`);
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
			const error = await res.json();

			console.error('Exercises service request error: ', error);
			throw new Error(
				`"Exercises service request error: ${error.type} - ${error.message}"`
			);
		}

		const data = await res.json();
		return data;
	} catch (e: any) {
		console.error('Exercises service internal error: ', e.message);
		throw new Error(`Exercises service internal error: ${e.message}`);
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
			const error = await res.json();

			console.error('Exercises service request error: ', error);
			throw new Error(
				`"Exercises service request error: ${error.type} - ${error.message}"`
			);
		}

		return await res.json();
	} catch (e: any) {
		console.error('Exercises service internal error: ', e.message);
		throw new Error(`Exercises service internal error: ${e.message}`);
	}
};
