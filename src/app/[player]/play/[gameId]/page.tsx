'use client';
import mockApple from '@/app/shared/mockData/apple';
import { useEffect, useState } from 'react';

// @ts-ignore
import useSound from 'use-sound';
import { useParams } from 'next/navigation';
import GamesResults from './components/GamesResults';
import GameRenderer from './components/GameRenderer';
import ProgressBar from './components/ProgressBar';

const mockGetResults = (gameId, playerId, wrongCount) => ({ score: 3 });

const MAX_ERRORS = 5;

export default function NonAiGames() {
	const { player, gameId } = useParams();

	const [apple, setApple] = useState<any>([]);
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number[]>([]);
	const [gameScore, setGameScore] = useState<number | null>(null);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	useEffect(() => {
		//fetch exercises
		setApple(mockApple);
	}, []);

	const sumErrorToCurrentGame = () => {
		setErrorCounter((prevValue) => {
			const updatedErrorCounter = [...prevValue];
			updatedErrorCounter[currentGameIndex] = updatedErrorCounter[
				currentGameIndex
			]
				? updatedErrorCounter[currentGameIndex] + 1
				: 1;
			return updatedErrorCounter;
		});
	};

	const setZeroErrorsToCurrentGame = () => {
		setErrorCounter((prevValue) => {
			const updatedErrorCounter = [...prevValue];

			if (!updatedErrorCounter[currentGameIndex]) {
				updatedErrorCounter[currentGameIndex] = 0;
			}

			return updatedErrorCounter;
		});
	};

	const handleWrongAnswer = () => {
		playWrongSound();
		sumErrorToCurrentGame();
	};

	const handleCorrectAnswer = () => {
		playCorrectSound();
		setZeroErrorsToCurrentGame();
	};

	const handleNextButton = () => {
		if (currentGameIndex < apple.exercises.length - 1) {
			setCurrentGameIndex((prevValue) => prevValue + 1);
		} else {
			const results = mockGetResults(gameId, player, errorCounter);
			setGameScore(results.score);
		}
	};

	const currentGame = apple.exercises?.[currentGameIndex];
	const completedPercentage = Math.trunc(
		(currentGameIndex / apple.exercises?.length) * 100
	);
	const moduleUrl = `/${player}/modules/${apple.moduleId}`;
	const outOfRetries = errorCounter[currentGameIndex] === MAX_ERRORS;

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
