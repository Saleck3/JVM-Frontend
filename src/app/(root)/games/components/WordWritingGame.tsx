'use client';

import { Roboto_Mono } from 'next/font/google';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';

type Props = {
	word: string;
	imgSrc: string;
	onWrongAnswer: () => void;
	handleNextButton: () => void;
};

const font = Roboto_Mono({ subsets: ['latin'] });

const WordWritingGame = (props: Props) => {
	const { word, imgSrc, onWrongAnswer, handleNextButton } = props;
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleCheck = () => {
		setIsIncorrect(false);

		if (word.toLocaleLowerCase() === inputValue.toLocaleLowerCase()) {
			setIsCorrect(true);
			playCorrectSound();
		} else {
			setIsIncorrect(true);
			playWrongSound();
			onWrongAnswer();
		}
	};

	const letterWidth = 1;
	const gapWidth = 0.5;

	const inputStyle = {
		fontSize: '3rem',
		border: 'none',
		width: `${word.length * (letterWidth + gapWidth)}ch`,
		background:
			'repeating-linear-gradient(90deg, dimgrey 0, dimgrey 1ch, transparent 0, transparent 1.5ch) 0 100%/100% 2px no-repeat',
		color: 'dimgrey',
		letterSpacing: `${gapWidth}ch`,
	};

	return (
		<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
				Escribí la palabra
			</h1>
			<div className="mb-6 text-center">
				<Image
					src={imgSrc}
					alt={word}
					className="object-cover mx-auto"
					height={300}
					width={200}
				/>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					maxLength={word.length}
					style={inputStyle}
					className={`${font.className} my-4 outline-none`}
					disabled={isCorrect}
				/>
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

export default WordWritingGame;
