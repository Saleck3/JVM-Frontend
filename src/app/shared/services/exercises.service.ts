import { adaptExercises, adaptScore } from '../adapters/exercises.adapter';

export const getExercises = async (
	playerId: string,
	appleId: string,
	token: string
) => {
	const query = new URLSearchParams({ playerId, appleId }).toString();
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises?${query}`;

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

			console.error('getExercises error: ', data);
			throw new Error(
				`getExercises res not ok error: ${data.status}, ${data.message}, ${data.url}`
			);
		}

		const data = await res.json();

		const exercises = adaptExercises(data);
		return { moduleId: data.moduleId!, exercises };
	} catch (e: any) {
		console.error('exercises service error', e.message);
	}
};

export const scoreExercises = async (
	playerId: string,
	appleId: string,
	exercises: number[],
	token: string
): number => {
	const query = new URLSearchParams({ playerId, appleId }).toString();
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises/score?${query}`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ gameErrors: exercises }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
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
	exerciseId: string,
	token: string
): Promise<any> => {
	const query = new URLSearchParams({ exerciseId }).toString();
	const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exercises/voice/score?${query}`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: audio,
			headers: {
				'Content-Type': 'audio/mp3',
				Authorization: `Bearer ${token}`,
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

		console.log('data', data);
		return data;
	} catch (e: any) {
		console.error('score voice service error', e.message);
	}
};
