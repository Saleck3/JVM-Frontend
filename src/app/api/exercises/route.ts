import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const headersList = headers();
	const token = headersList.get('Authorization')!;

	const url = `${process.env.API_URL}/api/exercise/getExerciseByAppleId?${searchParams}`;

	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!res.ok) {
			return Response.json(
				{ status: res.status, message: res.statusText, url },
				{ status: res.status }
			);
		}

		//todo adapter copado
		const data = await res.json();
		return Response.json(data);
	} catch (e: any) {
		console.error('proxy error: ', e.message);
		return Response.json(
			{ status: 500, message: `proxy error: ${e.message}` },
			{ status: 500 }
		);
	}
}
