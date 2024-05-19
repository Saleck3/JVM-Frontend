import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from './services/apples.service';

export default async function ApplePath({ params }: any) {
	const session = await getServerSession(options);
	// const player = session?.user.players.find(
	// 	(player) => player.alias === params.player
	// )!;

	// const apples = await getApples(
	// 	player.id,
	// 	params.id,
	// 	session?.user?.accessToken!
	// );

	const mockApples = [
		[
			{ id: 7, name: 'BL', stars: 0 },
			{ id: 8, name: 'BR', stars: 0 },
			{ id: 9, name: 'CL', stars: 0 },
			{ id: 10, name: 'CR', stars: 0 },
			{ id: 11, name: 'CH', stars: 0 },
		],
		[
			{ id: 7, name: 'BL', stars: 3 },
			{ id: 8, name: 'BR', stars: 0 },
			{ id: 9, name: 'CL', stars: 0 },
			{ id: 10, name: 'CR', stars: 0 },
			{ id: 11, name: 'CH', stars: 0 },
		],
		[
			{ id: 7, name: 'BL', stars: 3 },
			{ id: 8, name: 'BR', stars: 1 },
			{ id: 9, name: 'CL', stars: 0 },
			{ id: 10, name: 'CR', stars: 0 },
			{ id: 11, name: 'CH', stars: 0 },
		],
	];

	return (
		<main>
			{mockApples[Number(params.id) - 1].map((apple: any) => (
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
