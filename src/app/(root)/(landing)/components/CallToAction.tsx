import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function CallToAction() {
	return (
		<section
			className="flex flex-col items-center justify-center text-center lg:text-left lg:flex-row bg-yellow-200 h-screen"
			id="test"
		>
			<Image
				src={`/img/test-now.svg`}
				alt="lombriz haciendo un examen"
				width={600}
				height={600}
				className="mb-8 lg:mb-0 lg:mr-8 px-8 lg:px-0"
			/>

			<div>
				<h2 className="text-5xl font-bold tracking-tighter bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
					¡Comenzá ya tu <br />
					aventura!
				</h2>
				<Link href="/test">
					<Button className="mt-4 w-full text-md" size={'lg'} variant={'super'}>
						Ir al test de nivelación
					</Button>
				</Link>
			</div>
		</section>
	);
}
