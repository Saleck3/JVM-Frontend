'use client';

import { Button } from '@/components/ui/button';
import { ImageSelection } from '@/app/shared/types/games.type';
import { useState } from 'react';
import GameLayout from './GameLayout';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import useTextToSpeech from '../hooks/useTextToSpeech';

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
	} = props;

	const [playCorrectAnswer] = useTextToSpeech(correctAnswer);
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
			title="Seleccioná la opción"
			gameInstructions={gameInstructions['WordSelectionGame']}
			hasOwnCheckButton
		>
			<div className="mb-6 text-center flex-1 flex flex-col gap-8">
				{image ? (
					<div className="h-48 sm:h-72 md:h-96 mb-8 relative">
						<Image src={image!} alt={correctAnswer} fill objectFit="contain" />
					</div>
				) : (
					<>
						<div
							className="bubble text-sm p-3 sm:text-md md:text-xl 
										md:font-light sm:p-6 md:p-8 mx-auto"
						>
							<Button
								onClick={playCorrectAnswer}
								className="text-4xl mx-auto size-24 sm:size-32 rounded-full p-2"
								variant={'secondary'}
							>
								<FaPlayCircle className="text-orange-400" />
							</Button>
						</div>
						<div className="relative m-10 h-24 sm:h-30 md:h-36">
							<Image
								src="/img/games/talking.svg"
								fill
								objectFit="contain"
								alt="lombriz hablando"
							/>
						</div>
					</>
				)}

				<div>
					<p className="text-2xl sm:text-3xl md:text-4xl font-bold">{label}</p>
				</div>
				<div className="flex flex-wrap justify-around gap-4">
					{gameOptions?.map((option) => {
						const variant = getVariant(option);

						return (
							<Button
								key={option.value}
								variant={variant}
								onClick={() => handleSelectOption(option.value)}
								disabled={gameFinished || option.selected || outOfRetries}
								className="active:scale-110 transition-all uppercase
									flex-grow flex-shrink text-2xl lg:text-3xl"
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
