import { NextRequest, NextResponse } from 'next/server';

export async function register(req: NextRequest, res: NextResponse) {
    const url = `${process.env.API_URL}/api/auth/signup`;
    const body = req.body;
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
            console.error(res.status, error.message);
            return null;
        }
        const { data } = await res.json();
        return data;
    } catch (e: any) {
        console.error('register routes error', e.message);
    }
};
