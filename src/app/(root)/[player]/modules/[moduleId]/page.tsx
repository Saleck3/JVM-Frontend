import { Apple as AppleType } from '@/app/shared/types/apple.type';
import { getApples } from '@/app/shared/services/apples.service';
import {
	appleColors,
	getAppleImageStyle,
	getPathAxisPositions,
	getPathImageNumber,
	getPathImagesAmount,
	pathBgsStyle,
} from './data/styleLogic';
import { getSsrUtils } from '@/lib/utils';
import Apple from './components/Apple';
import Image from 'next/image';

export default async function ApplePath({ params }: any): Promise<JSX.Element> {
	const ssrUtils = await getSsrUtils();
	const token = ssrUtils.getAccessTokenSsr();
	const player = ssrUtils.getPlayerByAliasSsr(params.player);

	const apples: AppleType[] = (await getApples(
		player!.id,
		params.moduleId,
		token
	)) as AppleType[];

	const applePositions = getPathAxisPositions(apples.length);
	const imagesAmount = getPathImagesAmount(apples.length);

	return (
		<div
			className={`flex flex-col gap-8 items-center relative py-10`}
			style={pathBgsStyle[params.moduleId]}
		>
			{Array.from({ length: imagesAmount }, (_, i) => {
				const style = getAppleImageStyle(i);
				const imageNumber = getPathImageNumber(i);
				return (
					<Image
						key={`image-${i}`}
						src={`/img/apples/dancing-${imageNumber}.svg`}
						width={125}
						height={125}
						alt={`lombriz bailando ${i}`}
						style={style}
					/>
				);
			})}
			{apples.map((apple: any, i: number) => (
				<Apple
					key={apple.id}
					{...apple}
					playerAlias={player!.alias}
					leftPosition={applePositions[i]}
					colors={appleColors[params.moduleId]}
				/>
			))}
		</div>
	);
}
