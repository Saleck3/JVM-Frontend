'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { signOut } from 'next-auth/react';
import DropdownButton from '../DropdownButton';
import { User } from '../../types/user.type';

type Props = {
	user?: User;
};

export default function NavbarButtons({ user }: Props) {
	const handleSignOut = () => {
		signOut({
			callbackUrl: '/logout',
		});
	};

	const navbarItems = [
		{
			label: 'Logout',
			onClick: handleSignOut,
			className: 'text-red-600',
			hasSeparatorStart: true,
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
