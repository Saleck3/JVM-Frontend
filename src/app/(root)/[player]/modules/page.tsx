import LeadTitle from '@/app/shared/components/LeadTitle/LeadTitle';
import ModuleCard from './ModuleCard';
import modulesList from './modulesList.json';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Modules({ params }: any) {
	const session = await getServerSession(options);
	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;

	return (
		<main className="container py-16 md:px-12 xl:px-32 space-y-12">
			<LeadTitle
				title="Selección de Módulo"
				subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente fugit sunt itaque a voluptate voluptatum."
			/>
			<div className="flex gap-8 justify-around flex-wrap">
				{modulesList.map((module) => (
					<ModuleCard
						key={module.id}
						{...module}
						recommended={player.recommendedModule === module.id}
						playerNick={player.alias}
					/>
				))}
			</div>
		</main>
	);
}
