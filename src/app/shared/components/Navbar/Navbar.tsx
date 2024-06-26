import Image from 'next/image';
import Link from 'next/link';
import NavbarButtons from './NavbarButtons';

export default async function Navbar() {
	return (
		<header className="bg-white border-b">
			<div className="container flex items-center justify-between h-16 px-4 md:px-6">
				<Link href="/">
					<Image
						alt="Logo"
						height={140}
						src={`/img/isologo-v2.svg`}
						width={140}
					/>
				</Link>
				<NavbarButtons />
			</div>
		</header>
	);
}
