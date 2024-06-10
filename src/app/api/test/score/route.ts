import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const { gameErrors } = await req.json();

	const body = JSON.stringify({ exercises: gameErrors });

	const url = `${process.env.API_URL}/api/modules/recommendedModule`;

	try {
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			return Response.json(
				{ status: res.status, message: res.statusText, requestBody: body, url },
				{ status: res.status }
			);
		}

		const { recommendedModule } = await res.json();

		return Response.json(recommendedModule);
	} catch (e: any) {
		console.error('proxy error: ', e.message);
		return Response.json(
			{ status: 500, message: `proxy error: ${e.message}` },
			{ status: 500 }
		);
	}
}
