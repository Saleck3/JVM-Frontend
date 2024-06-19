import { Button } from '@/components/ui/button';
import { MdOutlineAddReaction } from 'react-icons/md';
import Players from './components/Players';
import LeadTitle from '@/app/shared/components/LeadTitle';
import Link from 'next/link';
import { getPlayers } from '@/lib/sessionUtils';

export default async function PlayerSelection() {
	const players = await getPlayers();

	return (
		<main className="container py-32 md:px-12 lg:px-32 space-y-12">
			<LeadTitle
				title="Selección de jugador"
				subtitle="Seleccioná un jugador para continuar"
			/>
			<Players playerList={players} />
			<div className="flex justify-center">
				<Link href="/players/create">
					<Button size="lg" variant={'defaultWithIcon'}>
						<MdOutlineAddReaction className="text-2xl" />
						Agregar jugador
					</Button>
				</Link>
			</div>
		</main>
	);
}
