import Image from 'next/image';
import Link from 'next/link';
import NavbarButtons from './NavbarButtons';

export default function Navbar() {
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
			<Link href="#">
				<Image alt="Logo" height={140} src={`/img/isologo.png`} width={140} />
			</Link>
			<NavbarButtons />
		</header>
	);
}
