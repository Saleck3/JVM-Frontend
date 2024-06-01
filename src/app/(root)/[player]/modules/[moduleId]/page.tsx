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
		params.moduleId,
		session?.user?.accessToken!
	);

	console.log('apples', apples);

	if (!apples) {
		return <h1> Aún no hay manzanas</h1>;
	}

	return (
		<div className="bg-blue-300 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] bg-cover flex flex-col items-center p-5 overflow-y-scroll h-screen">
			<ul className="relative w-full">
				{apples.map((apple: any, index: number) => (
					<ButtonApple
						key={'apple_' + apple.id}
						name={apple.name}
						playerAlias={player.alias}
						appleId={apple.id}
						stars={apple.stars}
						index={index}
					/>
				))}
			</ul>
		</div>
	);
}
