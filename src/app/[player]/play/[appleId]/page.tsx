'use client';
import { scoreExercises } from '@/app/shared/services/exercises.service';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import FetchingScore from '../../../shared/components/FetchingScore';
import GameRenderer from '../../../shared/components/GameRenderer';
import GamesResults from '../../../shared/components/GamesResults';
import ProgressBar from '../../../shared/components/ProgressBar';
import useGames from '@/app/shared/hooks/useGames';
import useUserData from '@/app/shared/hooks/useUserData';

export default function NonAiGames() {
	const { user, token } = useUserData();
	const [gameScore, setGameScore] = useState<number | null>(null);
	const [isFetchingScore, setIsFetchingScore] = useState(false);

	const { player: playerAlias, appleId } = useParams();

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
	} = useGames(playerId!, appleId as string, token!);

	const moduleUrl = `/${playerAlias}/modules/${apple?.moduleId}`;

	const handleNextButton = async () => {
		if (!isLastGame) {
			setNextGame();
		} else {
			setIsFetchingScore(true);

			const score = await scoreExercises(
				playerId!,
				appleId as string,
				errorCounter,
				token!
			);

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
							gameData={gameData}
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
