import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowGoBackFill } from 'react-icons/ri';

type Props = {
	score: number;
	moduleUrl: string;
};

export default function GamesResults({ score, moduleUrl }: Props) {
	return (
		<div className="pb-10">
			<div
				className="flex flex-col p-8 space-y-6 md:py-10 lg:py-12 md:space-y-10
			lg:space-y-16 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl
			sm:bg-white sm:rounded-lg sm:mt-8 sm:shadow-lg"
			>
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
					Obtuviste {score} estrellas
					<br />
					{'⭐'.repeat(score)}
				</p>

				<Button className="max-w-lg mx-auto">
					<RiArrowGoBackFill className="text-xl me-2" />
					<Link href={moduleUrl}>Volver al módulo</Link>
				</Button>
			</div>
		</div>
	);
}
