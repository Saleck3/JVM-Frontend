'use client';
import {
	scoreExercises,
	scoreTest,
} from '@/app/shared/services/exercises.service';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import useGames from '@/app/shared/hooks/useGames';
import useUserData from '@/app/shared/hooks/useUserData';
import FetchingScore from '../shared/components/FetchingScore';
import ProgressBar from '../shared/components/ProgressBar';
import GameRenderer from '../shared/components/GameRenderer';
import TestResults from './components/TestResults';

export default function NonAiGames() {
	const [gameScore, setGameScore] = useState<number | null>(null);
	const [isFetchingScore, setIsFetchingScore] = useState(false);
	const [recommendedModule, setRecommendedModule] = useState<any>(null);

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
	} = useGames(true);

	const handleNextButton = async () => {
		if (!isLastGame) {
			setNextGame();
		} else {
			setIsFetchingScore(true);
			const booleanErrors = errorCounter.map((error) => Boolean(error));
			const recommendedModule = scoreTest(booleanErrors);

			console.log('recommendedModule', recommendedModule);

			// const score = await scoreExercises(
			// 	playerId!,
			// 	appleId as string,
			// 	errorCounter,
			// 	token!
			// );

			// setGameScore(score);
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

	console.log('currentGame', currentGame);
	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			{gameScore ? (
				<TestResults recommendedModule={recommendedModule} />
			) : (
				<>
					<ProgressBar completedPercentage={completedPercentage} />
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
