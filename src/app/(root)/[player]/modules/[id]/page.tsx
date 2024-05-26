import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from '@/app/shared/services/apples.service';
import ButtonApple from './components/ButtonApple';
import '@/app/(root)/[player]/modules/[id]/components/appleStyles.css';

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
						key={"apple_" + apple.id}
						name={apple.name}
						playerAlias={player.alias}
						appleId={apple.id}
						stars={apple.stars} />
				))}
			</ul>
		</div >
	);
}
