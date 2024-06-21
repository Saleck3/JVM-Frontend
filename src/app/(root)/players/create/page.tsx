export const dynamic = 'force-dynamic';

import { Card } from '@/components/ui/card';
import AddPlayerForm from './components/AddPlayerForm';
import Image from 'next/image';

export default function AddPlayer() {
	return (
		<main className="py-32">
			<h1 className="text-center font-bold text-3xl mb-6 text-gray-700">
				Nuevo jugador
			</h1>
			<Card className="shadow-lg sm:w-full sm:max-w-sm p-8 mx-auto">
				<Image
					src="/img/reading.svg"
					alt="logo"
					width={200}
					height={200}
					className="mx-auto"
				/>
				<AddPlayerForm />
			</Card>
		</main>
	);
}
