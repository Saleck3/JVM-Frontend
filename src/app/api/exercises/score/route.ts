import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const url = `${process.env.API_URL}/api/exercise/obtainScore`;
	const playerId = searchParams.get('playerId')!;
	const appleId = searchParams.get('appleId')!;

	const Authorization = headers().get('Authorization')!;

	const { gameErrors } = await req.json();

	const body = JSON.stringify({ playerId, appleId, exercises: gameErrors });

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization,
			},
		});

		if (!res.ok) {
			const error = await res.json();
			console.error('Backend error: ', error);
			return Response.json(
				{
					status: res.status,
					message: res.statusText,
					url,
					type: 'Backend error',
				},
				{ status: res.status }
			);
		}

		const { score } = await res.json();
		return Response.json(score);
	} catch (e: any) {
		console.error('Proxy error: ', e);
		return Response.json(
			{
				status: 500,
				message: e.message,
				url,
				type: 'Proxy error',
			},
			{ status: 500 }
		);
	}
}
