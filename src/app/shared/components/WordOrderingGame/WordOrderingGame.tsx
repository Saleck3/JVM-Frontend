'use client';

import { LetterOrdering } from '@/app/shared/types/games.type';
import { useState } from 'react';
import GameLayout from '../GameLayout';
import WordOrderingGameSortableOptions from './WordOrderingGameSortableOptions';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';
import Image from 'next/image';

interface Props extends LetterOrdering {
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
	outOfRetries: boolean;
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

		if (
			playerAnswer.toLowerCase() ===
			correctAnswer.toLowerCase().replace(/ /g, '')
		) {
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
			title="Ordená los elementos"
			gameInstructions={gameInstructions['WordOrderingGame']}
			checkGame={handleCheck}
		>
			<div className="h-48 sm:h-72 md:h-96 mb-8 relative">
				<Image src={image!} alt={correctAnswer} fill objectFit="contain" />
			</div>

			<WordOrderingGameSortableOptions
				options={options}
				onSort={onSort}
				disableDrag={gameFinished || outOfRetries}
			/>
		</GameLayout>
	);
};

export default WordOrderingGame;
