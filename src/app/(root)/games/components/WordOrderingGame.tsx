'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';
import { Reorder } from 'framer-motion';

type Props = {
	words: string[];
	correctPhrase: string;
	correctPhraseSound: string;
	onWrongAnswer: () => void;
	handleNextButton: () => void;
};

const WordOrderingGame = (props: Props) => {
	const { words, correctPhrase, onWrongAnswer, handleNextButton } = props;
	const [orderedWords, setOrderedWords] = useState<string[]>(words);
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleCheck = () => {
		setIsIncorrect(false);

		if (orderedWords.join(' ') === correctPhrase) {
			setIsCorrect(true);
			playCorrectSound();
		} else {
			setIsIncorrect(true);
			playWrongSound();
			onWrongAnswer();
		}
	};

	return (
		<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
				Ordena la frase según el sonido
			</h1>
			<div className="mb-6 text-center space-y-10">
				<Image
					src="/img/icons/play-icon.svg"
					alt="play"
					className="mx-auto bg-accent rounded-full p-4 cursor-pointer active:bg-sky active:scale-110 transition-all"
					height={150}
					width={150}
				/>
				<Reorder.Group
					axis="x"
					values={orderedWords}
					onReorder={setOrderedWords}
					className="flex justify-center"
				>
					{orderedWords?.map((word) => {
						return (
							<Reorder.Item key={word} value={word} className="m-2">
								<Button variant={'secondary'}>{word}</Button>
							</Reorder.Item>
						);
					})}
				</Reorder.Group>
				{!isCorrect && (
					<Button className="w-full" onClick={handleCheck}>
						Comprobar
					</Button>
				)}
			</div>

			{isIncorrect && (
				<p className="text-red-500 text-center my-4">Incorrecto :(</p>
			)}

			{isCorrect && (
				<>
					<p className="text-green-500 text-center my-4">¡Correcto!</p>
					<Button className="w-full" onClick={handleNextButton}>
						Siguiente
					</Button>
				</>
			)}
		</div>
	);
};

export default WordOrderingGame;
