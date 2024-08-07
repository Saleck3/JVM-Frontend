import WordOrderingGame from '@/app/shared/components/WordOrderingGame/WordOrderingGame';
import WordSelectionGame from '@/app/shared/components/WordSelectionGame';
import WordWritingGame from '@/app/shared/components/WordWritingGame/WordWritingGame';
import { GameData } from '../types/games.type';
import VideoGame from './VideoGame';
import VoiceRecognitionGame from './VoiceRecognitionGame/VoiceRecognitionGame';

type Props = {
	gameData: GameData;
	outOfRetries: boolean;
	handleNextButton: () => void;
	handleCorrectAnswer: () => void;
	handleWrongAnswer: () => void;
};

const gameComponents: any = {
	letter_ordering: WordOrderingGame,
	image_selection: WordSelectionGame,
	image_writing: WordWritingGame,
	audio_repeating: VoiceRecognitionGame,
	text_read: VoiceRecognitionGame,
	video: VideoGame,
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

	console.log('gameType', gameType);
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
			key={gameId}
			src={gameParams.src}
			textRead={gameType === 'text_read'}
		/>
	);
}
