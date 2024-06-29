'use client';

import { Video } from '../types/games.type';
import GameLayout from './GameLayout';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';

interface Props extends Video {
	outOfRetries?: boolean;
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
}

const VideoGame = (props: Props): JSX.Element => {
	const { src, handleNextButton } = props;

	return (
		<GameLayout
			handleNextButton={handleNextButton}
			title="Reproducí el video"
			gameInstructions={gameInstructions['video']}
			hasOwnCheckButton
			gameFinished={true}
		>
			<div className="h-[480px] rounded-lg">
				<iframe
					src={src}
					allowFullScreen
					className="w-full h-full rounded-lg"
					data-testid="video"
				/>
			</div>
		</GameLayout>
	);
};

export default VideoGame;
