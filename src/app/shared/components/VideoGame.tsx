//TODO ver
'use client';
import React from 'react';
import { video as videoType } from '../types/games.type';
import GameLayout from './GameLayout';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';

interface Props extends videoType {
	outOfRetries?: boolean;
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
}

const VideoGame = (props: Props): JSX.Element => {
	const { src, onWrongAnswer, onCorrectAnswer, handleNextButton } = props;

	//TODO -ver que es esto - En realidad no hace falta, ver si se puede sacar
	const submitForm = () => {
		return true;
	};

	const setErrorsDefault = () => {
		onCorrectAnswer();
		handleNextButton();
	};
	console.log(src);

	return (
		<GameLayout
			handleNextButton={setErrorsDefault}
			title="Reproducí el video"
			gameInstructions={gameInstructions['WordWritingGame']}
			checkGame={submitForm}
			gameFinished={true}
		>
			<div className="mb-6 text-center flex-1 flex flex-col gap-8">
				<iframe src={src} allowFullScreen className="h-full" />
			</div>
		</GameLayout>
	);
};
export default VideoGame;
