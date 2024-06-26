import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	recommendedModule: string;
};

export default function TestResults({ recommendedModule }: Props) {
	return (
		<div className="flex flex-col p-8 space-y-6 md:py-10 lg:py-12 md:space-y-10 lg:space-y-16 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl sm:bg-white sm:rounded-lg sm:mt-8 sm:shadow-lg">
			<h2 className="text-3xl text-center font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 tracking-wider">
				¡Felicitaciones!
			</h2>
			<Image
				src="/img/party.svg"
				width={500}
				height={500}
				alt="felicitaciones"
				className="mx-auto"
			/>
			<p className="text-2xl font-bold text-conden text-center text-primary tracking-tighter">
				¡Tu módulo recomendado es el número {recommendedModule}!
			</p>
			<div className="mx-auto space-x-8">
				<Button>
					<Link href="/auth/register">Registrarse</Link>
				</Button>
				<Button variant={'link'}>
					<Link href="/">Volver</Link>
				</Button>
			</div>
		</div>
	);
}
