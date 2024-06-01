'use client';

import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import { ImageWriting } from '@/app/shared/types/games.type';
import Image from 'next/image';

interface Props extends ImageWriting {
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
}

const WordWritingGame = (props: Props): JSX.Element => {
	const {
		correctAnswer,
		image,
		preSelectedLetters,
		onWrongAnswer,
		onCorrectAnswer,
		handleNextButton,
	} = props;
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsIncorrect(false);

		const playerAnswer = getPlayerAnswer(e);

		if (!playerAnswer.length) return;

		if (
			correctAnswer.toLocaleLowerCase() === playerAnswer.toLocaleLowerCase()
		) {
			setIsCorrect(true);
			onCorrectAnswer();
		} else {
			setIsIncorrect(true);
			onWrongAnswer();
		}
	};

	const getPlayerAnswer = (e: FormEvent<HTMLFormElement>) => {
		const inputs = Array.from(e.currentTarget.elements).filter(
			(input) => input.tagName === 'INPUT'
		);
		return inputs.map((input: any) => input.value).join('');
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const input = e.currentTarget;

		if (e.key === 'Backspace') {
			const previousInput = findSiblingInput(input, 'prev');
			if (previousInput) previousInput.focus();
		} else {
			const nextInput = findSiblingInput(input, 'next');
			if (nextInput) nextInput.focus();
		}
	};

	const findSiblingInput = (
		input: HTMLInputElement,
		sibling: 'prev' | 'next'
	) => {
		const siblingProperty =
			sibling === 'prev' ? 'previousSibling' : 'nextSibling';

		let temp = input[siblingProperty];

		while (temp) {
			if (temp instanceof HTMLInputElement && !temp.disabled!) {
				return temp;
			}
			temp = temp[siblingProperty] as HTMLInputElement;
		}

		return null;
	};

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
				Escribí la palabra
			</h1>
			<div className="mb-6 text-center">
				<Image
					src={image!}
					alt={correctAnswer}
					className="object-cover mx-auto mb-6"
					height={300}
					width={200}
				/>
				<form className="space-y-8" onSubmit={handleSubmit}>
					<div className="flex justify-center">
						{correctAnswer.split('').map((letter, i) => {
							const preselectedLetter = preSelectedLetters.find(
								(pl) => pl.index === i
							);
							const commonClasses =
								'm-2 uppercase text-center border-b-4 border-secondary bg-gray focus:outline-none focus:bg-gray-200 rounded-sm text-5xl w-[1.7ch] ';

							if (preselectedLetter) {
								return (
									<input
										key={letter + i}
										className={`${commonClasses} bg-green-200`}
										value={preselectedLetter.letter}
										disabled
									/>
								);
							} else {
								return (
									<input
										className={commonClasses}
										name={i.toString()}
										type="text"
										key={letter + i}
										maxLength={1}
										onKeyUp={handleKeyUp}
									/>
								);
							}
						})}
					</div>
					{!isCorrect && (
						<Button className="w-full" type="submit">
							Comprobar
						</Button>
					)}
				</form>
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
