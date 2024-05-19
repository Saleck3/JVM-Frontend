import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from './services/apples.service';
import ButtonApple from '@/app/(root)/[player]/apple/components/buttonApple';
import '@/app/(root)/[player]/modules/[id]/services/appleStyles.css';

export default async function ApplePath({ params }: any) {
	const session = await getServerSession(options);

	const player = session?.user.players.find(
		(player) => player.alias === params.player
	)!;
	/*

	//SE REEMPLAZA POR EL MOCK
		const apples = await getApples(
			player.id,
			params.id,
			session?.user?.accessToken!
		);
	
		if (!apples) {
			return (
				<h1> Aun no hay manzanas</h1>
			);
		}
	
	
		return (
			<div className="apple-container">
				<ul className="apple-list">
					{apples.map((apple: any) => (
						<ButtonApple
							letter={apple.name}
							playerNick={player.alias}
							appleId={apple.id} />
					))}
				</ul>
			</div>
		);*/

	const mockApples = [
		[
			{ id: 1, name: 'A', stars: 0 },
			{ id: 2, name: 'E', stars: 0 },
			{ id: 3, name: 'I', stars: 0 },
			{ id: 4, name: 'O', stars: 0 },
			{ id: 5, name: 'U', stars: 0 },
			{ id: 6, name: 'U', stars: 0 },
		],
		[
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 0 },
			{ id: 3, name: 'I', stars: 0 },
			{ id: 4, name: 'O', stars: 0 },
			{ id: 5, name: 'U', stars: 0 },
			{ id: 6, name: 'U', stars: 0 },
		], [
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 1 },
			{ id: 3, name: 'I', stars: 0 },
			{ id: 4, name: 'O', stars: 0 },
			{ id: 5, name: 'U', stars: 0 },
			{ id: 6, name: 'U', stars: 0 },
		],
		[
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 1 },
			{ id: 3, name: 'I', stars: 1 },
			{ id: 4, name: 'O', stars: 0 },
			{ id: 5, name: 'U', stars: 0 },
			{ id: 6, name: 'U', stars: 0 },
		],
		[
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 1 },
			{ id: 3, name: 'I', stars: 1 },
			{ id: 4, name: 'O', stars: 1 },
			{ id: 5, name: 'U', stars: 0 },
			{ id: 6, name: 'U', stars: 0 },
		],
		[
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 1 },
			{ id: 3, name: 'I', stars: 1 },
			{ id: 4, name: 'O', stars: 1 },
			{ id: 5, name: 'U', stars: 1 },
			{ id: 6, name: 'U', stars: 0 },
		],
		,
		[
			{ id: 1, name: 'A', stars: 3 },
			{ id: 2, name: 'E', stars: 1 },
			{ id: 3, name: 'I', stars: 1 },
			{ id: 4, name: 'O', stars: 1 },
			{ id: 5, name: 'U', stars: 1 },
			{ id: 6, name: 'U', stars: 1 },
		],
	];

	if (params.id > 6) {
		params.id = 6
	}

	return (
		<div className="apple-container">
			<ul className="apple-list">
				{mockApples[Number(params.id) - 1].map((apple: any) => (
					<ButtonApple
						letter={apple.name}
						playerNick={player.alias}
						appleId={apple.id}
						stars={apple.stars} />
				))}
			</ul>
		</div>
	);

}
