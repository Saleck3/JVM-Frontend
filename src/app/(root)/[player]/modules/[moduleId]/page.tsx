import { getApples } from '@/app/shared/services/apples.service';
import ButtonApple from './components/ButtonApple';
import { getSsrUtils } from '@/lib/utils';

export default async function ApplePath({ params }: any) {
	const ssrUtils = await getSsrUtils();
	const token = ssrUtils.getAccessTokenSsr();
	const player = ssrUtils.getPlayerByAliasSsr(params.player);

	const apples = await getApples(player!.id, params.moduleId, token);

	//todo if (!apples) devolver 403
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
						playerAlias={params.player}
						appleId={apple.id}
						stars={apple.stars}
						index={index}
						type={apple.type}
					/>
				))}
			</ul>
		</div>
	);
}
