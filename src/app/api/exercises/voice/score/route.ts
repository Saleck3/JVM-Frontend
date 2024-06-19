import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const query = req.nextUrl.searchParams;
	const audio = await req.blob();
	const Authorization = headers().get('Authorization')!;

	const body = new FormData();
	body.append('file', audio);

	const url = `${process.env.API_URL}/api/ia/audio/checkAudio?${query}`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
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

		const data = await res.json();
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
