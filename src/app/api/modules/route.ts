import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const headersList = headers();
	const playerId = searchParams.get('playerId')!;
	const token = headersList.get('Authorization')!;

	const query = new URLSearchParams({ playerId });
	const url = `${process.env.API_URL}/api/modules/?${query}`;

	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!res.ok) {
			return Response.json(
				{ status: res.status, body: res.statusText, url },
				{ status: res.status }
			);
		}

		const data = await res.json();
		return Response.json({ data });
	} catch (e: any) {
		console.error(e.message);
		return Response.json({ status: 500, message: e.message }, { status: 500 });
	}
}
