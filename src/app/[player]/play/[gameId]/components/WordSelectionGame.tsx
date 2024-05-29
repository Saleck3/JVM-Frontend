'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';

type Props = {
	options: string[];
	label?: string;
	correctAnswer: string;
	imgSrc?: string;
	onWrongAnswer: () => void;
	handleNextButton: () => void;
};

const WordSelectionGame = (props: Props) => {
	const { options, correctAnswer, imgSrc, onWrongAnswer, handleNextButton } =
		props;
	const [isCorrect, setIsCorrect] = useState(false);
	const [gameOptions, setGameOptions] = useState(
		options.map((option: string) => ({ value: option, selected: false }))
	);
	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleClick = (option: string) => {
		if (option === correctAnswer) {
			setIsCorrect(true);
			playCorrectSound();
		} else {
			setGameOptions((prev) =>
				prev.map((o) => (o.value === option ? { ...o, selected: true } : o))
			);
			playWrongSound();
			onWrongAnswer();
		}
	};

	const getVariant = (option: { value: string; selected: boolean }) => {
		return isCorrect && option.value === correctAnswer
			? 'success'
			: option.selected
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
					alt={correctAnswer}
					className="object-cover mx-auto"
					height={300}
					width={200}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{gameOptions?.map((option) => {
					const variant = getVariant(option);

					return (
						<Button
							key={option.value}
							variant={variant}
							onClick={() => handleClick(option.value)}
						>
							{option.value}
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
