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

		const { recommendedModule } = await res.json();

		return Response.json(recommendedModule);
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
