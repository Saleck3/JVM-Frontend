'use client';
import { scoreExercises } from '@/app/shared/services/exercises.service';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import FetchingScore from './components/FetchingScore';
import GameRenderer from './components/GameRenderer';
import GamesResults from './components/GamesResults';
import ProgressBar from './components/ProgressBar';
import useNonAiGames from '@/app/shared/hooks/useNonAiGames';
import useUserData from '@/app/shared/hooks/useUserData';

export default function NonAiGames() {
	const { user, token } = useUserData();
	const [gameScore, setGameScore] = useState<number | null>(null);
	const [isFetchingScore, setIsFetchingScore] = useState(false);

	const { player: playerAlias, gameId } = useParams();

	const playerId = useMemo(
		() => user?.players.find((player) => player.alias === playerAlias)?.id,
		[user, playerAlias]
	);

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
	} = useNonAiGames(playerId!, gameId as string, token!);

	const moduleUrl = `/${playerAlias}/modules/${apple?.moduleId}`;

	const handleNextButton = async () => {
		if (!isLastGame) {
			setNextGame();
		} else {
			setIsFetchingScore(true);
			const score = await scoreExercises(
				playerId!,
				gameId as string,
				errorCounter,
				token!
			);

			setGameScore(score);
			setIsFetchingScore(false);
		}
	};

	if (isFetchingScore) {
		return <FetchingScore />;
	}

	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			{gameScore ? (
				<GamesResults score={gameScore} moduleUrl={moduleUrl} />
			) : (
				<>
					<ProgressBar
						completedPercentage={completedPercentage}
						moduleUrl={moduleUrl}
					/>
					{currentGame && (
						<GameRenderer
							gameType={currentGame.exerciseType}
							gameParams={currentGame.params}
							outOfRetries={outOfRetries}
							handleNextButton={handleNextButton}
							handleCorrectAnswer={handleCorrectAnswer}
							handleWrongAnswer={handleWrongAnswer}
						/>
					)}
				</>
			)}
		</div>
	);
}
