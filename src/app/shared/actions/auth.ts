'use server';

import {
	createLectiData,
	removeLectiData,
	setLectiData,
} from '@/lib/sessionUtils';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

type LogInData = {
	error?: string;
};

export const login = async (formData: FormData): Promise<LogInData | void> => {
	const email = formData.get('email');
	const password = formData.get('password');

	const url = process.env.API_URL + '/api/auth/login';

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			console.error('login error: ', res.statusText);
			return { error: 'Email o contraseña incorrecta' };
		}

		const { token, players } = await res.json();
		const { sub, exp } = jwtDecode(token);

		const userData = await createLectiData(sub!, players, token, exp!);
		setLectiData(userData);
	} catch (e: any) {
		console.error('login error: ', e.message);
		return { error: 'Error al iniciar sesión' };
	}

	redirect('/players');
};

export const logout = async (): Promise<void> => {
	await removeLectiData();
	redirect('/');
};
