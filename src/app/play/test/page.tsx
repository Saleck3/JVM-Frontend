'use client';
import { scoreTest } from '@/app/shared/services/exercises.service';
import { useState } from 'react';
import useGames from '@/app/shared/hooks/useGames';
import FetchingScore from '@/app/shared/components/FetchingScore';
import ProgressBar from '@/app/shared/components/ProgressBar';
import GameRenderer from '@/app/shared/components/GameRenderer';
import TestResults from './components/TestResults';

export default function NonAiGames() {
	const [isFetchingScore, setIsFetchingScore] = useState(false);
	const [recommendedModule, setRecommendedModule] = useState<string>();

	const {
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
			const booleanErrors = errorCounter.map((error) => error === 0);
			const recommendedModule = await scoreTest(booleanErrors);

			console.log('recommendedModule', recommendedModule);

			const lectiLocalStorageObj = {
				recommendedModule,
			};

			window.localStorage.setItem(
				'lecti',
				JSON.stringify(lectiLocalStorageObj)
			);

			setRecommendedModule(recommendedModule);
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

	if (recommendedModule) {
		return <TestResults recommendedModule={recommendedModule} />;
	}

	return (
		<div className="px-10 space-y-5 sm:space-y-8 md:space-y-12">
			<ProgressBar completedPercentage={completedPercentage} />
			{currentGame && (
				<GameRenderer
					gameData={gameData}
					outOfRetries={outOfRetries}
					handleNextButton={handleNextButton}
					handleCorrectAnswer={handleCorrectAnswer}
					handleWrongAnswer={handleWrongAnswer}
				/>
<<<<<<<< HEAD:src/app/play/test/page.tsx
========
			)}
		</div>
	);

	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			{recommendedModule ? (
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
>>>>>>>> b349952 (feat: complete visual rework):src/app/test/page.tsx
			)}
		</div>
	);
}
