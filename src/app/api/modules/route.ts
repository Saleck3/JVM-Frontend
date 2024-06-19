import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams;
	const url = `${process.env.API_URL}/api/modules?${query}`;
	const Authorization = headers().get('Authorization')!;

	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization,
			},
		});

		if (!res.ok) {
			console.error('res not ok proxy error: ', res.statusText);
			return Response.json(
				{ status: res.status, message: res.statusText, url },
				{ status: res.status }
			);
		}

		const { modules } = await res.json();
		return Response.json(modules);
	} catch (e: any) {
		console.error('proxy error: ', e.message);
		return Response.json(
			{ status: 500, message: `proxy error: ${e.message}` },
			{ status: 500 }
		);
	}
}
