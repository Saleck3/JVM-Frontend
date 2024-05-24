import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from '@/app/shared/services/apples.service';

export default async function ApplePath({ params }: any) {
	const session = await getServerSession(options);
	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;

	const apples = await getApples(
		player.id,
		params.id,
		session?.user?.accessToken!
	);

	return (
		<main>
			{apples.map((apple: any) => (
				<button
					className="bg-primary p-2 m-2 flex flex-col items-center"
					key={apple.id}
				>
					<span>Manzana de ejemplo {apple.name}</span>
					<span>{'⭐'.repeat(apple.stars)}</span>
				</button>
			))}
		</main>
	);
}
