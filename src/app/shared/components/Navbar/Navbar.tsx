import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
	return (
		<header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
			<Link href="#">
				<Image alt="Logo" height={100} src="/img/isologo.png" width={100} />
			</Link>
			<div className="flex items-center gap-4">
				<Button variant="outline">Get Started</Button>
				<Button>Sign In</Button>
			</div>
		</header>
	);
}
