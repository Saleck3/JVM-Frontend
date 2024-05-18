'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';
import DropdownButton from '../DropdownButton/DropdownButton';

export default function NavbarButtons() {
	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut({
			callbackUrl: '/logout',
		});
	};

	const navbarItems = [
		{
			label: 'Algo por aquí',
		},
		{
			label: 'Algo por acá',
		},
		{
			label: 'Logout',
			onClick: handleSignOut,
			className: 'text-red-600',
			hasSeparatorStart: true,
		},
	];

	if (session?.user) {
		return (
			<DropdownButton
				label={session?.user?.email}
				title="Mi cuenta"
				items={navbarItems}
			/>
		);
	} else {
		return (
			<div className="flex items-center gap-4">
				<Link href="/auth/register">
					<Button variant="outline">Registrarse</Button>
				</Link>
				<Link href="api/auth/signin">
					<Button>Login</Button>
				</Link>
			</div>
		);
	}
}
