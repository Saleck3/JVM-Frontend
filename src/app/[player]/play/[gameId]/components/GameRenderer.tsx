import WordOrderingGame from '@/app/shared/components/WordOrderingGame';
import WordSelectionGame from '@/app/shared/components/WordSelectionGame';
import WordWritingGame from '@/app/shared/components/WordWritingGame/WordWritingGame';

type Props = {
	gameType: string;
	gameParams: any;
	handleNextButton: () => void;
	handleCorrectAnswer: () => void;
	handleWrongAnswer: () => void;
};

const gameComponents: any = {
	letterOrdering: WordOrderingGame,
	imageSelection: WordSelectionGame,
	imageWriting: WordWritingGame,
};

export default function GameRenderer(props: Props) {
	const {
		gameType,
		gameParams,
		handleNextButton,
		handleCorrectAnswer,
		handleWrongAnswer,
	} = props;

	const GameComponent = gameComponents[gameType];

	return (
		<GameComponent
			options={gameParams.options}
			correctAnswer={gameParams.correctAnswer}
			onWrongAnswer={handleWrongAnswer}
			onCorrectAnswer={handleCorrectAnswer}
			handleNextButton={handleNextButton}
			image={gameParams.image}
			preSelectedLetters={gameParams.preSelectedLetters}
		/>
	);
}

//TODO pasar el GAME layout a este componente
