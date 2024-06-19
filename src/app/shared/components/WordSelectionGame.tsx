'use client';

import { Button } from '@/components/ui/button';
import { ImageSelection } from '@/app/shared/types/games.type';
import { useState } from 'react';
import GameLayout from './GameLayout';
import GameImage from './GameImage';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';

interface Props extends ImageSelection {
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
	outOfRetries: boolean;
}

const WordSelectionGame = (props: Props): JSX.Element => {
	const {
		options,
		correctAnswer,
		image,
		label,
		onWrongAnswer,
		onCorrectAnswer,
		handleNextButton,
		outOfRetries,
		tts,
		onlyText,
	} = props;

	const [gameFinished, setGameFinished] = useState(false);
	const [gameOptions, setGameOptions] = useState(
		options.map((option: string) => ({ value: option, selected: false }))
	);

	const handleSelectOption = (option: string) => {
		if (option === correctAnswer) {
			setGameFinished(true);
			onCorrectAnswer();
		} else {
			setGameOptions((prev) =>
				prev.map((o) => (o.value === option ? { ...o, selected: true } : o))
			);
			onWrongAnswer();
		}
	};

	const getVariant = (option: { value: string; selected: boolean }) => {
		return gameFinished && option.value === correctAnswer
			? 'success'
			: option.selected
			? 'gray'
			: 'secondary';
	};

	return (
		<GameLayout
			gameFinished={gameFinished}
			outOfRetries={outOfRetries}
			handleNextButton={handleNextButton}
			title="Seleccioná la palabra"
			gameInstructions={gameInstructions['WordSelectionGame']}
			hasOwnCheckButton
		>
			<div className="mb-6 text-center flex-1 flex flex-col gap-8">
				{image && <div className="flex-1 relative">
					<GameImage image={image} tts={tts || correctAnswer} />
				</div>}

				{!image &&
					<div className="flex-1 relative">
						<GameImage image="/img/icons/play-icon.svg" tts={tts || correctAnswer} />
					</div>
				}
				<div>
					<p className="text-2xl sm:text-3xl md:text-4xl font-bold">
						{label}
					</p>
				</div>
				<div className="flex flex-wrap justify-around gap-4">
					{gameOptions?.map((option) => {
						const variant = getVariant(option);

						return (
							<Button
								key={option.value}
								variant={variant}
								className="text-xl sm:text-2xl md:text-3xl py-4 md:py-6 lg:py-8"
								onClick={() => handleSelectOption(option.value)}
								disabled={gameFinished || option.selected || outOfRetries}
							>
								{option.value}
							</Button>
						);
					})}
				</div>
			</div>
		</GameLayout>
	);
};

export default WordSelectionGame;
