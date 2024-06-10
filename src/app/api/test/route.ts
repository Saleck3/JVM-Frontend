export async function GET() {
	const url = `${process.env.API_URL}/api/exercise/obtainTest`;

	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
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
		console.error('proxy error: ', e.message);
		return Response.json(
			{ status: 500, message: `proxy error: ${e.message}` },
			{ status: 500 }
		);
	}
}
