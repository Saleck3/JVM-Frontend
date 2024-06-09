import useTextToSpeech from '../hooks/useTextToSpeech';
import GameInstructionsButton from './GameInstructionsButton';
import GameCheckButton from './GameCheckButton';

type Props = {
	children: React.ReactNode;
	title: string;
	gameFinished: boolean;
	wrongAttempt?: boolean;
	outOfRetries?: boolean;
	handleNextButton: () => void;
	gameInstructions: string;
	checkGame?: any;
	hasOwnCheckButton?: boolean;
};

export default function GameLayout(props: Props) {
	const {
		children,
		gameFinished,
		wrongAttempt = false,
		title,
		handleNextButton,
		outOfRetries,
		gameInstructions,
		checkGame,
		hasOwnCheckButton,
	} = props;

	const [playInstructions] = useTextToSpeech(gameInstructions || '');

	const onCheckButtonClick =
		outOfRetries || gameFinished ? handleNextButton : checkGame;

	return (
		<div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-lg p-6 py-12 flex flex-col space-y-4">
			<div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
				{gameInstructions && (
					<GameInstructionsButton onclick={playInstructions} />
				)}
				<h1 className="text-3xl md:text-5xl font-bold text-gray-700 text-center">
					{title}
				</h1>
			</div>
			{children}

			<GameCheckButton
				onClick={onCheckButtonClick}
				wrongAttempt={wrongAttempt}
				outOfRetries={outOfRetries!}
				gameFinished={gameFinished}
				hasOwnCheckButton={hasOwnCheckButton}
			/>
		</div>
	);
}
