import { Player } from '@/app/shared/types/user.type';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';

import Link from 'next/link';

export default function PlayerCard({ playerName, alias, totalCrowns }: Player) {
	return (
		<Link
			className="group relative cursor-pointer rounded-lg bg-gray-100 p-4 hover:scale-100 basis-48"
			href={`${alias}/modules`}
		>
			<div className="flex items-center justify-center">
				<Avatar className="h-16 w-16">
					<AvatarImage alt={playerName} src="/img/placeholder-avatar.jpg" />
					<AvatarFallback>
						{playerName ? (playerName[0] + playerName[1]).toUpperCase() : ''}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="mt-4 text-center">
				<h3 className="text-lg font-medium line-clamp-1">{playerName}</h3>
				<p className="text-gray-500">{totalCrowns} ⭐</p>
			</div>
			<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900/50 opacity-0 transition-opacity group-hover:opacity-100">
				<CheckIcon className="h-8 w-8 text-white" />
			</div>
		</Link>
	);
}

function CheckIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}
