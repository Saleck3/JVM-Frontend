'use client';

import { Player } from '@/app/shared/types/user.type';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { updateLectiData } from '@/lib/sessionUtils';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';

type Props = {
	player: Player;
};

export default function PlayerCard({ player }: Props) {
	const { playerName, totalCrowns } = player;
	const router = useRouter();

	const setCurrentPlayer = () => {
		updateLectiData({ currentPlayer: player });
		router.push('/modules');
	};

	return (
		<div
			className="group relative cursor-pointer rounded-lg bg-gray-100 p-4 hover:scale-100 basis-48"
			onClick={setCurrentPlayer}
		>
			<div className="flex items-center justify-center">
				<Avatar className="h-16 w-16">
					<AvatarImage alt={playerName} src="/placeholder-avatar.jpg" />
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
				<FaCheck className="h-8 w-8 text-white" />
			</div>
		</div>
	);
}

//TODO subir el estado al comp padre para que este pueda ser client side y poder usar onclick, mientras que el padre puede usar el ssr utils
