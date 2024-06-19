import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const audio = await req.blob();
	const headersList = headers();

	const exerciseId = searchParams.get('exerciseId')!;
	const token = headersList.get('Authorization')!;

	const body = new FormData();
	body.append('file', audio);

	const query = new URLSearchParams({ exerciseId }).toString();

	const url = `${process.env.API_URL}/api/ia/audio/checkAudio?${query}`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				Authorization: token,
			},
		});

		if (!res.ok) {
			return Response.json(
				{ status: res.status, message: res.statusText, url },
				{ status: res.status }
			);
		}

		const data = await res.json();

		return Response.json(data);
	} catch (e: any) {
		console.error(e.message);
		return Response.json({ status: 500, message: e.message }, { status: 500 });
	}
}
