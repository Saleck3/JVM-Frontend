export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import DropdownButton from '../DropdownButton';
import { getLoggedUser } from '@/lib/sessionUtils';

export default async function NavbarButtons() {
	const user = await getLoggedUser();

	const navbarItems = [
		{
			label: 'Jugadores',
			href: '/players',
		},
		{
			label: 'Módulos',
			href: '/modules',
		},
	];

	if (user) {
		return (
			<DropdownButton label={user} title="Mi cuenta" items={navbarItems} />
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
