import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const url = `${process.env.API_URL}/api/player/addPlayer`;
	const body = await req.json();
	const Authorization = headers().get('Authorization')!;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization,
				'Content-Type': 'application/json',
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

		const data = await res.text();
		return Response.json(data);
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
