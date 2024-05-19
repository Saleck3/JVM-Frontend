'use client';
import Image from 'next/image';
import Link from 'next/link';
import NavbarButtons from './NavbarButtons';
import { useSession } from 'next-auth/react';

export default function Navbar() {
	const { data: session } = useSession();
	if (session?.user) {
		var home = "/players";
	} else {
		var home = "/";
	}
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">

			<Link href={home}>
				<Image
					alt="Logo"
					height={140}
					src={`/img/isologo.png`}
					width={140}
				/>
			</Link>
			<NavbarButtons />
		</header>
	);
}
