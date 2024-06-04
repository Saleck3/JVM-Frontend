'use client';

import { Button } from '@/components/ui/button';
import { LetterOrdering } from '@/app/shared/types/games.type';
import { useState } from 'react';
import Image from 'next/image';
import GameLayout from '../GameLayout';
import WordOrderingGameSortableOptions from './WordOrderingGameSortableOptions';

interface Props extends LetterOrdering {
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
	outOfRetries?: boolean;
}

const WordOrderingGame = (props: Props): JSX.Element => {
	const {
		options,
		image,
		correctAnswer,
		onWrongAnswer,
		onCorrectAnswer,
		handleNextButton,
		outOfRetries,
	} = props;
	const [playerAnswer, setPlayerAnswer] = useState<string>('');
	const [gameFinished, setGameFinished] = useState(false);
	const [wrongAttempt, setWrongAttempt] = useState(false);

	const handleCheck = () => {
		setWrongAttempt(false);

		if (playerAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
			setGameFinished(true);
			onCorrectAnswer();
		} else {
			setWrongAttempt(true);
			onWrongAnswer();
		}
	};

	const onSort = (options: string[]) => {
		const joinedOptions = options.join('');
		setPlayerAnswer(joinedOptions);
	};

	return (
		<GameLayout
			gameFinished={gameFinished}
			wrongAttempt={wrongAttempt}
			outOfRetries={outOfRetries}
			handleNextButton={handleNextButton}
			title="Ordena los elementos"
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

				<WordOrderingGameSortableOptions options={options} onSort={onSort} />

				{!gameFinished && !outOfRetries && (
					<Button className="w-full mt-6" onClick={handleCheck}>
						Comprobar
					</Button>
				)}
			</div>
		</GameLayout>
	);
};

export default WordOrderingGame;
