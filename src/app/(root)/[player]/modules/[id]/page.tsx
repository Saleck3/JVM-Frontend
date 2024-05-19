import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from './services/apples.service';
import ButtonApple from '@/app/(root)/[player]/apple/components/buttonApple';

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
	);
}
