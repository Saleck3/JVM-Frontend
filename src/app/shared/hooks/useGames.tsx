import { useEffect, useState } from 'react';
import { getExercises, getTest } from '../services/exercises.service';
import useGameSounds from './useGameSounds';

const MAX_ERRORS = 2;

const useGames = (isTest: boolean, appleId?: string) => {
	const { playCorrectSound, playWrongSound } = useGameSounds();

	const [apple, setApple] = useState<any>();
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number[]>([]);

	const currentGame = apple?.exercises?.[currentGameIndex];
	const completedPercentage = Math.trunc(
		(currentGameIndex / apple?.exercises?.length) * 100
	);
	const outOfRetries = errorCounter[currentGameIndex] === MAX_ERRORS;
	const isLastGame = currentGameIndex === apple?.exercises?.length - 1;

	useEffect(() => {
		const fetchExercises = async () => {
			const apple = await getExercises(appleId!);
			setApple(apple);
		};

		const fetchtest = async () => {
			const apple = await getTest();
			setApple(apple);
		};

		!isTest && fetchExercises();
		isTest && fetchtest();
	}, [appleId, isTest]);

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

	const setNextGame = () => {
		setCurrentGameIndex((prevValue) => prevValue + 1);
	};

	const handleWrongAnswer = () => {
		playWrongSound();
		sumErrorToCurrentGame();
	};

	const handleCorrectAnswer = () => {
		playCorrectSound();
		setZeroErrorsToCurrentGame();
	};

	return {
		apple,
		errorCounter,
		currentGame,
		completedPercentage,
		outOfRetries,
		setNextGame,
		isLastGame,
		handleWrongAnswer,
		handleCorrectAnswer,
	};
};

export default useGames;
