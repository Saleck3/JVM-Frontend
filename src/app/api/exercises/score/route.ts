import { RollerCoaster } from 'lucide-react';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const playerId = searchParams.get('playerId')!;
	const appleId = searchParams.get('appleId')!;

	const headersList = headers();
	const token = headersList.get('Authorization')!;

	const { gameErrors } = await req.json();

	const body = JSON.stringify({ playerId, appleId, exercises: gameErrors });

	const url = `${process.env.API_URL}/api/exercise/obtainScore`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!res.ok) {
			return Response.json(
				{ status: res.status, message: res.statusText, requestBody: body, url },
				{ status: res.status }
			);
		}

		//todo type de score
		const { score } = await res.json();
		return Response.json(score);
	} catch (e: any) {
		console.error('proxy error: ', e.message);
		return Response.json(
			{ status: 500, message: `proxy error: ${e.message}` },
			{ status: 500 }
		);
	}
}
