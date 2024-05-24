import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function CallToAction() {
	return (
		<section className="flex flex-col items-center justify-center text-center lg:text-left lg:flex-row bg-secondary h-screen">
			<Image
				src={`/img/test-now.svg`}
				alt="lombriz haciendo un examen"
				width={500}
				height={500}
				className="mb-8 lg:mb-0 lg:mr-8"
			/>

			<div className="space-y-2">
				<h2 className="text-5xl font-bold tracking-tighter bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
					¡Comenzá ya tu <br />
					aventura!
				</h2>
				<Link href="/test">
					<Button className="mt-4 w-full" size={'lg'}>
						Realizar test de nivelación
					</Button>
				</Link>
			</div>
		</section>
	);
}
