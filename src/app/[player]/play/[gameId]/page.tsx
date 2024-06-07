'use client';
import { useEffect, useMemo, useState } from 'react';

// @ts-ignore
import useSound from 'use-sound';
import { useParams } from 'next/navigation';
import GamesResults from './components/GamesResults';
import GameRenderer from './components/GameRenderer';
import ProgressBar from './components/ProgressBar';
import { useSession } from 'next-auth/react';
import {
	getExercises,
	scoreExercises,
} from '@/app/shared/services/exercises.service';
import FetchingScore from './components/FetchingScore';

const MAX_ERRORS = 5;

export default function NonAiGames() {
	const user = useSession().data?.user;

	const { player: playerAlias, gameId } = useParams();

	const [exercises, setExercises] = useState<any>([]);
	const [moduleId, setModuleId] = useState<number | null>(null);
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number[]>([]);
	const [gameScore, setGameScore] = useState<number | null>(null);
	const [isFetchingScore, setIsFetchingScore] = useState(false);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const playerId = useMemo(() => {
		return user?.players.find((player) => player.alias === playerAlias)!.id;
	}, [user, playerAlias]);

	useEffect(() => {
		const fetchExercises = async () => {
			const { accessToken } = user!;

			const apple = await getExercises(
				playerId!,
				gameId as string,
				accessToken
			);

			setModuleId(apple?.moduleId);
			setExercises(apple?.exercises);
		};

		user && fetchExercises();
	}, [user]);

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

	const handleNextButton = async () => {
		if (currentGameIndex < exercises.length - 1) {
			setCurrentGameIndex((prevValue) => prevValue + 1);
		} else {
			setIsFetchingScore(true);
			const { accessToken } = user!;
			const score = await scoreExercises(
				playerId!,
				gameId as string,
				errorCounter,
				accessToken
			);

			setGameScore(score);
			setIsFetchingScore(false);
		}
	};

	const currentGame = exercises?.[currentGameIndex];
	const completedPercentage = Math.trunc(
		(currentGameIndex / exercises?.length) * 100
	);
	const moduleUrl = `/${playerAlias}/modules/${moduleId}`;
	const outOfRetries = errorCounter[currentGameIndex] === MAX_ERRORS;

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
