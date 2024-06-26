export const dynamic = 'force-dynamic';

import LeadTitle from '@/app/shared/components/LeadTitle';
import ModuleCard from './components/ModuleCard';
import { getModules } from '@/app/shared/services/modules.service';
import { getCurrentPlayer } from '@/lib/sessionUtils';
import { Breadcrumbs } from '@/app/shared/components/Breadcrumbs';

export default async function Modules() {
	const player = await getCurrentPlayer();
	const modules = await getModules(player!.id);

	const breadcrumbLinks = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Jugadores', href: '/players' },
		{ name: 'Módulos', href: '/modules' },
	];

	return (
		<main className="container pb-48 pt-8 md:pt-16 md:px-12 lg:px-32 space-y-4 sm:space-y-8 md:space-y-12">
			<Breadcrumbs links={breadcrumbLinks} />
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
