'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { signOut } from 'next-auth/react';
import DropdownButton from '../DropdownButton';
import { User } from '../../types/user.type';
import { useRouter } from 'next/navigation';

type Props = {
	user?: User;
};

export default function NavbarButtons({ user }: Props) {
	const router = useRouter();

	const handleSignOut = () => {
		signOut({
			callbackUrl: '/logout',
		});
	};

	const redirectToPlayers = () => {
		window.location.href = ("/players");
	};

	const navbarItems = [
		{
			label: 'Jugadores',
			onClick: () => router.push('/players'),
		},
		{
			label: 'Logout',
			onClick: handleSignOut,
			className: 'text-red-600',
		},

	];

	if (user) {
		return (
			<DropdownButton
				label={user.email}
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
				<Link href="auth/login">
					<Button>Login</Button>
				</Link>
			</div>
		);
	}
}
