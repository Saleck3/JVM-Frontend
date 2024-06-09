import VoiceRecognitionGame from '@/app/shared/components/VoiceRecognitionGame';
import WordOrderingGame from '@/app/shared/components/WordOrderingGame/WordOrderingGame';
import WordSelectionGame from '@/app/shared/components/WordSelectionGame';
import WordWritingGame from '@/app/shared/components/WordWritingGame/WordWritingGame';

type Props = {
	gameData: GameData;
	outOfRetries: boolean;
	handleNextButton: () => void;
	handleCorrectAnswer: () => void;
	handleWrongAnswer: () => void;
};

//TODO exportar type
type GameData = {
	gameType: string;
	params: any;
	id: string;
};

const gameComponents: any = {
	letter_ordering: WordOrderingGame,
	image_selection: WordSelectionGame,
	image_writing: WordWritingGame,
	audio_repeating: VoiceRecognitionGame,
};

export default function GameRenderer(props: Props) {
	const {
		gameData,
		handleNextButton,
		handleCorrectAnswer,
		handleWrongAnswer,
		outOfRetries,
	} = props;

	const { params: gameParams, gameType, id: gameId } = gameData;
	const GameComponent = gameComponents[gameType];

	console.log('gameData', gameData);

	return (
		<GameComponent
			options={gameParams.options}
			correctAnswer={gameParams.correctAnswer}
			onWrongAnswer={handleWrongAnswer}
			onCorrectAnswer={handleCorrectAnswer}
			handleNextButton={handleNextButton}
			image={gameParams.image}
			preSelectedLetters={gameParams.preSelectedLetters}
			label={gameParams.label}
			outOfRetries={outOfRetries}
			gameId={gameId}
		/>
	);
}
