import LeadTitle from '@/app/shared/components/LeadTitle/LeadTitle';
import ModuleCard from './ModuleCard';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getModules } from './services/modules.service';

export default async function Modules({ params }: any) {
	const session = await getServerSession(options);
	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;

	const modules = await getModules(player.id, session?.user?.accessToken!);

	if (!modules) {
		return (
			<h1> Error al obtener modulos!</h1>
		);
	}

	return (
		<main className="container py-16 md:px-12 xl:px-32 space-y-12">
			<LeadTitle
				title="Selección de Módulo" subtitle={''} />
			<div className="flex gap-8 justify-around flex-wrap">
				{modules.map((module: any) => (
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
