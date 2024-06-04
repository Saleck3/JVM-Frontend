import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = `${process.env.API_URL}/api/auth/signup`;
  const body = await req.json();
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 400) {
        return Response.json(
          { status: res.status, body: res.json, url },
          { status: res.status }
        );
      }
    }

    const data = await res.text();
    return Response.json({ data });
  } catch (e: any) {
    console.error("register routes error", e.message);
    return Response.json({ status: 500, message: e.message }, { status: 500 });
  }
}
