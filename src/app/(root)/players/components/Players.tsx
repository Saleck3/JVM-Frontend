import { Player } from '@/app/shared/types/user.type';
import PlayerCard from './PlayerCard';

type Props = {
	playerList?: Player[];
};

export default function Players({ playerList }: Props) {
	return (
		<div className="flex flex-wrap gap-6 md:gap-12 justify-center">
			{playerList?.map((player) => {
				return <PlayerCard key={player.id} player={player} />;
			})}
		</div>
	);
}
