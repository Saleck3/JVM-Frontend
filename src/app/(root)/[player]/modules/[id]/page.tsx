import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getApples } from '@/app/shared/services/apples.service';
import ButtonApple from './components/ButtonApple';

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
		<div className="bg-blue-300 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] flex justify-center p-5">
			<ul className="list-none grid sm:grid-cols-3 xl:grid-cols-5 w-4/5">
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
