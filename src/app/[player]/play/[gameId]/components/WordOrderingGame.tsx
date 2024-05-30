'use client';

import { LetterOrdering } from '@/app/shared/types/games.type';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef, useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';

interface Props extends LetterOrdering {
	onWrongAnswer: () => void;
	handleNextButton: () => void;
}

const WordOrderingGame = (props: Props): JSX.Element => {
	const { options, image, correctAnswer, onWrongAnswer, handleNextButton } =
		props;
	const [orderedOptions, setOrderedOptions] = useState<string[]>(options);
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);

	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	const handleCheck = () => {
		setIsIncorrect(false);

		if (orderedOptions.join('').toLowerCase() === correctAnswer.toLowerCase()) {
			setIsCorrect(true);
			playCorrectSound();
		} else {
			setIsIncorrect(true);
			playWrongSound();
			onWrongAnswer();
		}
	};

	const dragOption = useRef<number>(0);
	const draggedOverOption = useRef<number>(0);

	const handleSort = () => {
		const newOptions = [...orderedOptions];
		const draggedOption = newOptions[dragOption.current];
		newOptions[dragOption.current] = newOptions[draggedOverOption.current];
		newOptions[draggedOverOption.current] = draggedOption;
		setOrderedOptions(newOptions);
	};

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mx-auto">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
				Ordena los elementos
			</h1>
			<div className="mb-6 text-center space-y-10">
				<Image
					src={image!}
					alt={correctAnswer}
					className="object-cover mx-auto mb-6"
					height={300}
					width={200}
				/>
				<div className="flex justify-around">
					{orderedOptions?.map((option, i) => {
						return (
							<Button
								key={option + i}
								variant={'secondary'}
								draggable
								onDragStart={() => (dragOption.current = i)}
								onDragEnter={() => (draggedOverOption.current = i)}
								onDragEnd={handleSort}
								onDragOver={(e) => e.preventDefault()}
								className="cursor-grab active:scale-110 active:cursor-grabbing transition-all text-5xl"
							>
								{option}
							</Button>
						);
					})}
				</div>
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
