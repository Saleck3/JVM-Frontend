'use client';

import { Button } from '@/components/ui/button';
import { FormEvent, useRef, useState } from 'react';
import { ImageWriting } from '@/app/shared/types/games.type';
import Image from 'next/image';
import WordWritingGameInputs from './WordWritingGameInputs';
import GameLayout from '../GameLayout';
import { gameInstructions } from '@/app/[player]/play/[appleId]/data/gameInstructions';

interface Props extends ImageWriting {
	outOfRetries?: boolean;
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
}

const GAME_INSTRUCTIONS =
	'Escribi la palabra y apretá comprobar';

const WordWritingGame = (props: Props): JSX.Element => {
	const {
		correctAnswer,
		image,
		preSelectedLetters,
		onWrongAnswer,
		onCorrectAnswer,
		handleNextButton,
		outOfRetries,
	} = props;

	const [gameFinished, setGameFinished] = useState<boolean>(false);
	const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setWrongAttempt(false);

		const playerAnswer = getPlayerAnswer(e);
		if (!playerAnswer.length) return;

		const playerCorrectAnswer =
			playerAnswer.toLowerCase() === correctAnswer.toLowerCase();

		if (playerCorrectAnswer) {
			setGameFinished(true);
			onCorrectAnswer();
		} else {
			setWrongAttempt(true);
			onWrongAnswer();
		}
	};

	const getPlayerAnswer = (e: FormEvent<HTMLFormElement>) => {
		const inputs = Array.from(e.currentTarget.elements).filter(
			(input): input is HTMLInputElement => input.tagName === 'INPUT'
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
		direction: 'prev' | 'next'
	): HTMLInputElement | null => {
		const siblingProperty =
			direction === 'prev' ? 'previousSibling' : 'nextSibling';

		let sibling = input[siblingProperty];

		while (sibling) {
			if (sibling instanceof HTMLInputElement && !sibling.disabled!) {
				return sibling;
			}
			sibling = sibling[siblingProperty] as HTMLInputElement;
		}

		return null;
	};

	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(
				new Event('submit', { bubbles: true, cancelable: true })
			);
		}
	};

	return (
		<GameLayout
			gameFinished={gameFinished}
			wrongAttempt={wrongAttempt}
			outOfRetries={outOfRetries}
			handleNextButton={handleNextButton}
			title="Escribí la palabra"
			gameInstructions={gameInstructions['WordWritingGame']}
			checkGame={submitForm}
		>
			<div className="mb-6 text-center flex-1 flex flex-col gap-8">
				<div className="flex-1 relative">
					<Image
						src={image!}
						alt={correctAnswer}
						fill
						className="object-contain"
					/>
				</div>
				<form onSubmit={handleSubmit} ref={formRef}>
					<WordWritingGameInputs
						word={correctAnswer}
						preSelectedLetters={preSelectedLetters}
						onKeyUp={handleKeyUp}
						disableInputs={gameFinished || outOfRetries}
					/>
				</form>
			</div>
		</GameLayout>
	);
};

export default WordWritingGame;
