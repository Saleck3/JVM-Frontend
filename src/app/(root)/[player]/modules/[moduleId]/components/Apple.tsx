import React from 'react';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { FaAppleWhole } from 'react-icons/fa6';

type Props = {
	name: string;
	playerAlias: string;
	id: number;
	stars: number;
	leftPosition: string;
	colors: { front: string; back: string };
};

export default function Apple(props: Props): JSX.Element {
	const { name, playerAlias, id, stars, leftPosition, colors } = props;

	const style: React.CSSProperties = {
		position: 'relative',
		left: leftPosition,
	};

	return (
		<Link style={style} href={`/${playerAlias}/play/${id}`} className="group">
			<div className="relative">
				<FaAppleWhole
					className={`absolute w-[100px] h-[100px] drop-shadow bottom-2 group-active:opacity-0`}
					style={{ color: colors.front }}
				/>
				<FaAppleWhole
					className={`w-[100px] h-[100px]`}
					style={{ color: colors.back }}
				/>
			</div>
			<span
				className={`absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/3 text-2xl font-bold text-gray-700`}
			>
				{name}
			</span>
			<div className="relative">
				<span className={`absolute -bottom-1 text-3xl flex gap-2`}>
					{Array.from({ length: stars }, (_, index) => (
						<FaStar className="text-yellow-600" key={`${id}-${index}-star`} />
					))}
				</span>
				<span className={`absolute bottom-0 text-3xl flex gap-2`}>
					{Array.from({ length: stars }, (_, index) => (
						<FaStar className="text-yellow-400" key={`${id}-${index}-star`} />
					))}
				</span>
			</div>
		</Link>
	);
}
