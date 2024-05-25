'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';

type Props = {
	words: string[];
	correctWord: string;
	imgSrc: string;
	onWrongAnswer: () => void;
	handleNextButton: () => void;
};

const WordSelectionGame = (props: Props) => {
	const { words, correctWord, imgSrc, onWrongAnswer, handleNextButton } = props;
	const [isCorrect, setIsCorrect] = useState(false);
	const [gameWords, setGameWords] = useState(
		words.map((word: string) => ({ value: word, selected: false }))
	);
	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleClick = (word: string) => {
		if (word === correctWord) {
			setIsCorrect(true);
			playCorrectSound();
		} else {
			setGameWords((prev) =>
				prev.map((w) => (w.value === word ? { ...w, selected: true } : w))
			);
			playWrongSound();
			onWrongAnswer();
		}
	};

	const getVariant = (word: { value: string; selected: boolean }) => {
		return isCorrect && word.value === correctWord
			? 'success'
			: word.selected
			? 'gray'
			: 'secondary';
	};

	return (
		<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
				Selecciona la palabra correcta
			</h1>
			<div className="mb-6">
				<Image
					src={imgSrc}
					alt={correctWord}
					className="object-cover mx-auto"
					height={300}
					width={200}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{gameWords?.map((word) => {
					const variant = getVariant(word);

					return (
						<Button
							key={word.value}
							variant={variant}
							onClick={() => handleClick(word.value)}
						>
							{word.value}
						</Button>
					);
				})}
			</div>
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

export default WordSelectionGame;
