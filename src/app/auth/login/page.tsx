'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import LoginForm from './components/LoginForm';
import { Card } from '@/components/ui/card';

export default function Login() {
	return (
		<div
			className="h-screen flex items-center justify-center 
				bg-[url('/img/login-bg.jpg')] bg-cover bg-no-repeat bg-center"
		>
			<Card className="shadow-lg sm:w-full sm:max-w-sm p-8">
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
				<Suspense>
					<LoginForm />
				</Suspense>
			</Card>
		</div>
	);
}
