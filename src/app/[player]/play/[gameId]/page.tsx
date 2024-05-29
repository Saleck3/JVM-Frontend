'use client';
import mockApple from '@/app/shared/mockData/apple';
import { useEffect, useState } from 'react';
import WordOrderingGame from './components/WordOrderingGame';
import WordSelectionGame from './components/WordSelectionGame';
import WordWritingGame from './components/WordWritingGame';

export default function Games() {
	const [games, setGames] = useState<any>([]);
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number>(0);

	useEffect(() => {
		setGames(mockApple);
	}, []);

	const getCurrentGame = () => {
		switch (games[currentGameIndex]?.exerciseType) {
			case 'letterOrdering':
				return (
					<WordOrderingGame
						options={games[currentGameIndex].params.options}
						correctAnswer={games[currentGameIndex].params.correctAnswer}
						onWrongAnswer={() => setErrorCounter((prevValue) => prevValue + 1)}
						handleNextButton={() =>
							setCurrentGameIndex((prevValue) => prevValue + 1)
						}
					/>
				);
			case 'imageSelection':
				return (
					<WordSelectionGame
						options={games[currentGameIndex].params.options}
						correctAnswer={games[currentGameIndex].params.correctAnswer}
						onWrongAnswer={() => setErrorCounter((prevValue) => prevValue + 1)}
						imgSrc={games[currentGameIndex].params.image}
						handleNextButton={() =>
							setCurrentGameIndex((prevValue) => prevValue + 1)
						}
					/>
				);
			case 'imageWriting':
				return (
					<WordWritingGame
						correctAnswer={games[currentGameIndex].params.correctAnswer}
						onWrongAnswer={() => setErrorCounter((prevValue) => prevValue + 1)}
						imgSrc={games[currentGameIndex].params.image}
						handleNextButton={() =>
							setCurrentGameIndex((prevValue) => prevValue + 1)
						}
						preselectedLetters={
							games[currentGameIndex].params.preSelectedLetters
						}
					/>
				);
			default:
				return (
					<div>
						Fin <br />
						Errores: {errorCounter}
						<img src="https://i.ytimg.com/vi/Ywv8A0vsFqk/hqdefault.jpg" />
						<button onClick={() => setCurrentGameIndex(0)}>Otra vez</button>
					</div>
				);
		}
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
			{getCurrentGame()}
		</div>
	);
}
