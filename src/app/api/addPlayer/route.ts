import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   
	 const headersList = headers();
  const token = headersList.get('Authorization')!;
  const url = `${process.env.API_URL}/api/player/addPlayer`;
  const body = await req.json();
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!res.ok) {
        console.log("soy un 400 del proxi");
        return Response.json(
          { status: res.status, body: res.json, url },
          { status: res.status }
        );
    }

    const data = await res.json();
    return Response.json({ data });
  } catch (e: any) {
    console.error("proxy error", e.message);
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
}
