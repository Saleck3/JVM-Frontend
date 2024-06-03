//! COMPONENTE DESCARTABLE
'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Login() {
	const handleLogin = async (e: any) => {
		e.preventDefault();

		const email = e.target.elements.email.value;
		const password = e.target.elements.password.value;

		await signIn('credentials', {
			email,
			password,
			redirect: true,
		});
	};

	const error = useSearchParams().get('error');
	const success = useSearchParams().get('success');

	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Link href="/">
					<Image
						src="/img/hero_img.png"
						alt="logo"
						width={100}
						height={100}
						className="mx-auto"
					/>
				</Link>

				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Ingresá a tu cuenta
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleLogin} method="POST">
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm relative ">
							<span className="block sm:inline">
								Email o contraseña incorrecto
							</span>
						</div>
					)}
					{success && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-sm relative">
							<span className="block sm:inline">Registro exitoso, reingresá tus datos.</span>
						</div>
					)}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
				</form>
				<div className="text-sm mt-4">
					<Link href="/auth/register" className="font-semibold text-primary">
						¿No tenes cuenta? Registrate!
					</Link>
				</div>
			</div>
		</main>
	);
}
