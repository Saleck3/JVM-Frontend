'use client';
import { scoreExercises } from '@/app/shared/services/exercises.service';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import useGames from '@/app/shared/hooks/useGames';
import FetchingScore from '@/app/shared/components/FetchingScore';
import GamesResults from '@/app/shared/components/GamesResults';
import ProgressBar from '@/app/shared/components/ProgressBar';
import GameRenderer from '@/app/shared/components/GameRenderer';
import useGameSounds from '@/app/shared/hooks/useGameSounds';

export default function NonAiGames() {
	const [gameScore, setGameScore] = useState<number | null>(null);
	const [isFetchingScore, setIsFetchingScore] = useState(false);
	const { playFinishedSound } = useGameSounds();

	const { appleId } = useParams();

	const {
		apple,
		errorCounter,
		currentGame,
		completedPercentage,
		outOfRetries,
		setNextGame,
		isLastGame,
		handleCorrectAnswer,
		handleWrongAnswer,
	} = useGames(false, appleId as string);

	const moduleUrl = `/modules/${apple?.moduleId}`;

	const handleNextButton = async () => {
		if (!isLastGame) {
			setNextGame();
		} else {
			setIsFetchingScore(true);

			const gameErrors = errorCounter.filter((error) => !isNaN(error));
			const score = await scoreExercises(appleId as string, gameErrors);

			setGameScore(score);
			setIsFetchingScore(false);
		}
	};

	const gameData = {
		gameType: currentGame?.exerciseType,
		params: currentGame?.params,
		id: currentGame?.id,
	};

	if (isFetchingScore) {
		return <FetchingScore />;
	}

	if (gameScore) {
		return <GamesResults score={gameScore} moduleUrl={moduleUrl} />;
	}

	return (
		<div className="px-10 space-y-5 pb-10" data-testid="game">
			<ProgressBar
				completedPercentage={completedPercentage}
				moduleUrl={moduleUrl}
			/>
			{currentGame && (
				<GameRenderer
					gameData={gameData}
					outOfRetries={outOfRetries}
					handleNextButton={handleNextButton}
					handleCorrectAnswer={handleCorrectAnswer}
					handleWrongAnswer={handleWrongAnswer}
				/>
			)}
		</div>
	);
}
