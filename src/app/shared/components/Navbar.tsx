import Image from 'next/image';
import Link from 'next/link';
import NavbarButtons from './NavbarButtons';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Navbar() {
	const session = await getServerSession(options);
	const navbarLogohref = session?.user ? '/players' : '/'
	
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
			<Link href={navbarLogohref}>
				<Image alt="Logo" height={140} src={`/img/isologo.png`} width={140} />
			</Link>
			<NavbarButtons />
		</header>
	);
}
