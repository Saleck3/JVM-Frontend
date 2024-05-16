import Image from 'next/image';
import Link from 'next/link';
import NavbarButtons from './NavbarButtons';

export default function Navbar() {
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
			<Link href="#">
				<Image
					alt="Logo"
					height={100}
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/isologo.png`}
					width={100}
				/>
			</Link>
			<NavbarButtons />
		</header>
	);
}
