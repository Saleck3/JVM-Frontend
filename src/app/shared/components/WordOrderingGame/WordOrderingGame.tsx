'use client';

import { Button } from '@/components/ui/button';
import { FaPen } from 'react-icons/fa';
import { FaRedoAlt } from 'react-icons/fa';
import { gameInstructions } from '@/app/[player]/play/[appleId]/data/gameInstructions';
import { LetterOrdering } from '@/app/shared/types/games.type';
import { useState } from 'react';
import GameLayout from '../GameLayout';
import Image from 'next/image';
import WordOrderingGameSortableOptions from './WordOrderingGameSortableOptions';

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
			gameInstructions={gameInstructions['WordOrderingGame']}
			checkGame={handleCheck}
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

				{/* {!gameFinished && !outOfRetries && (
					<Button
						className="w-full mt-6 text-md"
						onClick={handleCheck}
						variant={'defaultWithIcon'}
					>
						{wrongAttempt ? (
							<>
								<FaRedoAlt /> Reintentar
							</>
						) : (
							<>
								<FaPen /> Comprobar
							</>
						)}
					</Button>
				)} */}
			</div>
		</GameLayout>
	);
};

export default WordOrderingGame;
