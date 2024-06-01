'use client';
import mockApple from '@/app/shared/mockData/apple';
import { useEffect, useState } from 'react';
import WordOrderingGame from '../../../shared/components/WordOrderingGame';
import WordSelectionGame from '../../../shared/components/WordSelectionGame';
import WordWritingGame from '../../../shared/components/WordWritingGame';

// @ts-ignore
import useSound from 'use-sound';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AudioRepeatingGame from '@/app/shared/components/AudioRepeatingGame';

const gameComponents: any = {
	letterOrdering: WordOrderingGame,
	imageSelection: WordSelectionGame,
	imageWriting: WordWritingGame,
	audio_repeating: AudioRepeatingGame,
};

export default function Games() {
	const { player, gameId } = useParams();

	const [apple, setApple] = useState<any>([]);
	const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
	const [errorCounter, setErrorCounter] = useState<number>(0);
	const [gamesResults, setGamesResults] = useState(null);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleWrongAnswer = () => {
		playWrongSound();
		setErrorCounter((prevValue) => prevValue + 1);
	};

	const handleCorrectAnswer = () => {
		playCorrectSound();
	};

	const handleNextButton = () => {
		console.log('currentGameIndex', currentGameIndex);
		console.log('first', apple.exercises.length);
		if (currentGameIndex < apple.exercises.length - 1) {
			setCurrentGameIndex((prevValue) => prevValue + 1);
		} else {
			//handle send results
			setGamesResults({ score: 3 });
		}
	};

	useEffect(() => {
		setApple(mockApple);
	}, []);

	const getCurrentGame = () => {
		const currentGame = apple.exercises?.[currentGameIndex];
		const GameComponent = gameComponents[currentGame?.exerciseType];

		if (!GameComponent) return null;

		const { params: gameParams } = currentGame;

		return (
			<GameComponent
				options={gameParams.options}
				correctAnswer={gameParams.correctAnswer}
				onWrongAnswer={handleWrongAnswer}
				onCorrectAnswer={handleCorrectAnswer}
				handleNextButton={handleNextButton}
				image={gameParams.image}
				preSelectedLetters={gameParams.preSelectedLetters}
			/>
		);
	};

	const completedPercentage = Math.trunc(
		(currentGameIndex / apple.exercises?.length) * 100
	);

	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			{gamesResults ? (
				<>
					<h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 tracking-wider">
						¡Felicitaciones!
					</h2>
					<Image
						src="/img/party.svg"
						width={500}
						height={500}
						alt="felicitaciones"
					/>
					<p className="text-2xl font-bold text-conden text-center text-primary tracking-tighter">
						Obtuviste {gamesResults.score} estrellas
						<br />
						{'⭐'.repeat(gamesResults.score)}
					</p>
					<Button>
						<Link href={`/${player}/modules/${apple.moduleId}`}>
							Volver al módulo
						</Link>
					</Button>
				</>
			) : (
				<>
					<div className="w-full mx-10 h-5 rounded bg-gray-400">
						<div
							className="h-full bg-primary transition-all rounded w-[50%]"
							style={{ width: `${completedPercentage}%` }}
						></div>
					</div>
					{getCurrentGame()}
				</>
			)}
		</div>
	);
}
