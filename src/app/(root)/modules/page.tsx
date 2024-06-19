import LeadTitle from '@/app/shared/components/LeadTitle';
import ModuleCard from './components/ModuleCard';
import { getModules } from '@/app/shared/services/modules.service';
import { getCurrentPlayer } from '@/lib/sessionUtils';

export default async function Modules() {
	const player = await getCurrentPlayer();
	const modules = await getModules(player!.id);

	if (!modules) return 'foo'; //TODO error handler

	return (
		<main className="container py-16 md:px-12 xl:px-32 space-y-12">
			<LeadTitle
				title="Selección de Módulo"
				subtitle="¡Elegí tu camino! Podés volver y elegir otro cuando quieras."
			/>
			<div className="flex gap-8 justify-around flex-wrap">
				{modules.map((module: any) => (
					<ModuleCard
						key={module.id}
						{...module}
						recommended={player?.recommendedModule === module.id}
					/>
				))}
			</div>
		</main>
	);
}
