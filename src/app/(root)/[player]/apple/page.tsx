import LeadTitle from '@/app/shared/components/LeadTitle/LeadTitle';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getApple } from './services/apple.service';


export default async function Apple({ params }: any) {
	const session = await getServerSession(options);
	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;

	const apple = await getApple(player.id, params.id,session?.user?.accessToken!);

	return (
		<main className="container py-16 md:px-12 xl:px-32 space-y-12">
			<LeadTitle
				title="Selección de Módulo" subtitle={''} />
			<div className="flex gap-8 justify-around flex-wrap">
			</div>
		</main>
	);
}
