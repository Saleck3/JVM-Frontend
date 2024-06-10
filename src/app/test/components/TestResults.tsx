import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	recommendedModule: string;
};

export default function TestResults({ recommendedModule }: Props) {
	return (
		<>
			<h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 tracking-wider">
				¡Felicitaciones!
			</h2>
			<Image
				src="/img/party.svg"
				width={500}
				height={500}
				alt="felicitaciones"
			/>
			<p className="text-2xl font-bold text-conden text-center text-primary tracking-tighter">
				¡Tu modulo recomendado es el numero {recommendedModule}!
			</p>
			<Button>
				<Link href="/auth/register">Registrarse</Link>
			</Button>
		</>
	);
}
