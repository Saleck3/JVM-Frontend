'use client';
import mockApple from '@/app/shared/mockData/apple';
import { useEffect, useState } from 'react';
import WordOrderingGame from './components/WordOrderingGame';
import WordSelectionGame from './components/WordSelectionGame';
import WordWritingGame from './components/WordWritingGame';

// @ts-ignore
import useSound from 'use-sound';

const gameComponents: any = {
	letterOrdering: WordOrderingGame,
	imageSelection: WordSelectionGame,
	imageWriting: WordWritingGame,
};

export default function Games() {
	const [games, setGames] = useState<any>([]);
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number>(0);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleWrongAnswer = () => {
		playWrongSound();
		setErrorCounter((prevValue) => prevValue + 1);
	};

	const handleCorrectAnswer = () => {
		playCorrectSound();
	};

	useEffect(() => {
		setGames(mockApple);
	}, []);

	const getCurrentGame = () => {
		const currentGame = games[currentGameIndex];
		const GameComponent = gameComponents[currentGame?.exerciseType];

		if (!GameComponent) return null;

		const { params: gameParams } = currentGame;

		return (
			<GameComponent
				options={gameParams.options}
				correctAnswer={gameParams.correctAnswer}
				onWrongAnswer={handleWrongAnswer}
				onCorrectAnswer={handleCorrectAnswer}
				handleNextButton={() =>
					setCurrentGameIndex((prevValue) => prevValue + 1)
				}
				image={gameParams.image}
				preSelectedLetters={gameParams.preSelectedLetters}
			/>
		);
	};

	const completedPercentage = Math.trunc(
		(currentGameIndex / games.length) * 100
	);

	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			<div className="w-full mx-10 h-5 rounded bg-gray-400">
				<div
					className="h-full bg-primary transition-all rounded w-[50%]"
					style={{ width: `${completedPercentage}%` }}
				></div>
			</div>
			{currentGameIndex < games.length ? (
				getCurrentGame()
			) : (
				<div>
					Errores: {errorCounter}{' '}
					<img src="https://i.ytimg.com/vi/Ywv8A0vsFqk/hqdefault.jpg" alt="" />
					<button onClick={() => setCurrentGameIndex(0)}>De nuevo</button>
				</div>
			)}
		</div>
	);
}
