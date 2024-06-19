export async function GET() {
	const url = `${process.env.API_URL}/api/exercise/obtainTest`;

	try {
		const res = await fetch(url, {
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
