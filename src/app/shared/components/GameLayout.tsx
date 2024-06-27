import { Button } from '@/components/ui/button';
import useTextToSpeech from '../hooks/useTextToSpeech';
import GameCheckButton from './GameCheckButton';
import { IoEar } from 'react-icons/io5';

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
				return 'sm:bg-sky-100/50';
			case gameFinished:
				return 'sm:bg-green-400/50';
			case wrongAttempt:
				return 'sm:bg-red-300/50';
			default:
				return 'sm:bg-pink-300/50';
		}
	};

	const showFooterColor = hasOwnCheckButton
		? gameFinished || outOfRetries
			? true
			: false
		: true;

	return (
		<>
			<div
				className="mx-auto sm:shadow-lg sm:bg-white/80 sm:rounded-lg
							max-w-4xl"
			>
				<div className="sm:p-8 md:p-14">
					<div
						className="flex items-center justify-center gap-2 text-2xl bg-
					sm:text-3xl md:text-4xl mb-6 sm:mb-10 md:mb-14"
					>
						<h1 className="font-bold text-sky text-balance text-center">
							{gameInstructions && (
								<Button className="inline me-4" variant={'defaultWithIcon'}>
									<IoEar onClick={playInstructions} className="text-2xl" />
								</Button>
							)}
							{title}
						</h1>
					</div>
					{children}
				</div>
				<div
					className={`${showFooterColor && getFooterColor()}
								flex items-center justify-end rounded-b-lg
								h-20 sm:h-28 md:h-32 sm:px-8 mt-10 sm:mt-0`}
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
			</div>
		</>
	);
}
