import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const Authorization = headers().get('Authorization')!;

	const url = `${process.env.API_URL}/api/apple/getApplesByModuleId?${searchParams}`;

	try {
		const res = await fetch(url, {
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

		const { apples } = await res.json();
		return Response.json(apples);
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
