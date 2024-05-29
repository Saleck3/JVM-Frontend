import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from '@/app/shared/services/apples.service';
import Link from 'next/link';

export default async function ApplePath({ params }: any) {
	const session = await getServerSession(options);
	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;

	const apples = await getApples(
		player.id,
		params.playerId,
		session?.user?.accessToken!
	);

	console.log('apples page', apples);

	return (
		<main>
			{apples?.map((apple: any) => (
				<Link key={apple.id} href={`/${player.alias}/play/${apple.id}`}>
					<button className="bg-primary p-2 m-2 flex flex-col items-center">
						<span>Manzana de ejemplo {apple.name}</span>
						<span>{'⭐'.repeat(apple.stars)}</span>
					</button>
				</Link>
			))}
		</main>
	);
}
