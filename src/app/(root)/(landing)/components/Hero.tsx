import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
	return (
		<div className="container xl:px-20 px-4 md:px-6 mx-auto py-12 md:py-24 lg:py-32 xl:py-48a lg:mb-0 bg-gradient-to-b from-white from-70% to-pink-200">
			<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
				<div className="flex flex-col items-center justify-center space-y-4 text-center order-last lg:order-first">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Unite a las aventuras
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
							¡Hace del aprendizaje de la lecto escritura una experiencia mucho
							más divertida!
						</p>
					</div>
					<div className="w-full">
						<Button className="w-full lg:w-1/3 mx-2 mb-4 lg:mb-0 text-md">
							<Link href="#">Empezá ahora</Link>
						</Button>
						<Button
							variant={'secondary'}
							className="w-full lg:w-1/3 mx-2 text-md"
						>
							<Link href="#test">Test de nivelación</Link>
						</Button>
					</div>
				</div>
				<Image
					alt="Hero"
					height="550"
					src={`/img/hero-bgless.svg`}
					width="550"
					className="justify-self-center"
				/>
			</div>
		</div>
	);
}
