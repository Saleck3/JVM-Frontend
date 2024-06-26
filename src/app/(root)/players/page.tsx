export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import { MdOutlineAddReaction } from 'react-icons/md';
import Players from './components/Players';
import LeadTitle from '@/app/shared/components/LeadTitle';
import Link from 'next/link';
import { getPlayers } from '@/lib/sessionUtils';
import { Breadcrumbs } from '@/app/shared/components/Breadcrumbs';

export default async function PlayerSelection() {
	const players = await getPlayers();

	const breadcrumbLinks = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Jugadores', href: '/players' },
	];

	return (
		<main className="container pb-48 pt-8 md:pt-16 md:px-12 lg:px-32 space-y-4 sm:space-y-8 md:space-y-12">
			<Breadcrumbs links={breadcrumbLinks} />
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
