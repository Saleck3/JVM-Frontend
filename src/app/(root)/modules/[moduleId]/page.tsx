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
import Apple from './components/Apple';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiArrowGoBackFill } from 'react-icons/ri';

export default async function ApplePath({ params }: any): Promise<JSX.Element> {
	const apples: AppleType[] = (await getApples(params.moduleId)) as AppleType[];

	const applePositions = getPathAxisPositions(apples.length);
	const imagesAmount = getPathImagesAmount(apples.length);

	return (
		<div
			className={`flex flex-col gap-8 items-center relative pb-48`}
			style={pathBgsStyle[params.moduleId]}
		>
			<Button
				className="text-lg space-x-2 relative top-4 right-28 
								sm:top-8 sm:right-40 md:right-64 "
			>
				<Link href="/modules">Volver</Link>
				<RiArrowGoBackFill className="text-xl" />
			</Button>
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
					leftPosition={applePositions[i]}
					colors={appleColors[params.moduleId]}
				/>
			))}
		</div>
	);
}
