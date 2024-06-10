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
      if (res.status === 409) {
        return new Response(
          JSON.stringify({ status: res.status, body: await res.json(), url }),
          { status: res.status }
        );
      }
    }

    const data = await res.text();
    return new Response(JSON.stringify({ data }));
  } catch (e: any) {
    console.error("register routes error", e.message);
    return new Response(
      JSON.stringify({ status: 500, message: e.message }),
      { status: 500 }
    );
  }
}
