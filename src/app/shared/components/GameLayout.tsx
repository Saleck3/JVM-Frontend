import useTextToSpeech from '../hooks/useTextToSpeech';
import GameCheckButton from './GameCheckButton';
import { RiUserVoiceFill } from 'react-icons/ri';

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
	gameCheckButtonDissabledLoading?: boolean;
	gameCheckButtonDissabled?: boolean;
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
		gameCheckButtonDissabledLoading,
		gameCheckButtonDissabled,
	} = props;

	const [playInstructions] = useTextToSpeech(gameInstructions || '');

	const onCheckButtonClick =
		outOfRetries || gameFinished ? handleNextButton : checkGame;

	const getFooterColor = () => {
		switch (true) {
			case outOfRetries:
				return 'bg-sky-300/50';
			case gameFinished:
				return 'bg-green-400/50';
			case wrongAttempt:
				return 'bg-red-500/25';
			default:
				return 'bg-pink-300/50';
		}
	};

	return (
		<>
			<div
				className="px-4 pb-28 mx-auto sm:shadow-lg sm:bg-white sm:p-8 sm:rounded-lg
							md:p-14 max-w-4xl"
			>
				<div
					className="flex items-center justify-center gap-2 text-2xl bg-
								sm:text-3xl md:text-4xl mb-6 sm:mb-10 md:mb-14"
				>
					{gameInstructions && <RiUserVoiceFill onClick={playInstructions} />}
					<h1 className="font-bold text-gray-700">{title}</h1>
				</div>
				{children}
			</div>
			<div
				className={`fixed bottom-0 left-0 h-20 sm:h-28 md:h-32 w-full px-8
							flex items-center justify-end ${getFooterColor()}`}
			>
				<GameCheckButton
					onClick={onCheckButtonClick}
					wrongAttempt={wrongAttempt}
					outOfRetries={outOfRetries!}
					gameFinished={gameFinished}
					hasOwnCheckButton={hasOwnCheckButton}
					loading={gameCheckButtonDissabledLoading}
					disabled={gameCheckButtonDissabled}
				/>
			</div>
		</>
	);
}
