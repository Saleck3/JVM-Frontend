//TODO refactor con hooks
'use client';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { scoreVoice } from '../../services/exercises.service';
import useTextToSpeech from '../../hooks/useTextToSpeech';

import '../../styles/bubble.css';
import GameLayout from '../GameLayout';
import VoiceRecognitionGameButtons from './VoiceRecognitionGameButtons';

type Props = {
	gameId: string;
	playerId: string;
	correctAnswer: string;
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
	outOfRetries: boolean;
	onlyText?: Boolean;
};

const VoiceRecognitionGame = (props: Props): JSX.Element => {
	const {
		gameId,
		correctAnswer,
		onCorrectAnswer,
		onWrongAnswer,
		handleNextButton,
		outOfRetries,
	} = props;

	const [isRecording, setIsRecording] = useState<any>(false);
	const [stream, setStream] = useState<any>(null);
	const [audioChunks, setAudioChunks] = useState<any>([]);
	const [audio, setAudio] = useState<any>(null);
	const [audioBlob, setAudioBlob] = useState<any>(null);
	const mediaRecorder = useRef<any>(null);
	const [hasAudioPermissions, setHasAudioPermissions] = useState<any>(false);

	const [isFetchingScore, setIsFetchingScore] = useState<any>(false);
	//TODO type de correction
	const [audioCorrection, setAudioCorrection] = useState<any>(null);

	const gameInstructions =
		'Escuchá la palabra con el botón azul. Repetila en el micrófono. Cuando termines, volvé a presionar el micrófono. Comprobá tu respuesta';

	const [playCorrectAnswerTTS] = useTextToSpeech(correctAnswer);

	const createMediaStream = async () => {
		if ('MediaRecorder' in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setStream(streamData);
				return streamData;
			} catch (e: any) {
				alert(e.message);
			}
		} else {
			alert('The MediaRecorder API is not supported in your browser.');
		}
	};

	const startRecording = async () => {
		const mediaStream = stream || (await createMediaStream());

		const media = new MediaRecorder(mediaStream, { type: 'audio/mp3' } as any);
		mediaRecorder.current = media;

		setIsRecording(true);

		mediaRecorder.current.start();

		let localAudioChunks: any = [];

		mediaRecorder.current.ondataavailable = (e: any) => {
			if (typeof e.data === 'undefined') return;
			if (e.data.size === 0) return;

			localAudioChunks.push(e.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const handleRecordButton = async () => {
		hasAudioPermissions ? toggleRecording() : allowMicrophone();
	};

	const allowMicrophone = async () => {
		try {
			await navigator.mediaDevices.getUserMedia({ audio: true });
		} catch (e) {
			alert(
				'No pudimos pedirte permisos para microfono. Probablemente hayas bloqueado el acceso.'
			);
		}
	};

	useEffect(() => {
		const setPermissions = (permissions: any) => {
			setHasAudioPermissions(permissions.state === 'granted');
		};

		const checkPermissions = async () => {
			const permissions = await navigator.permissions.query({
				name: 'microphone' as any,
			});

			setPermissions(permissions);

			permissions.onchange = () => {
				setPermissions(permissions);
			};

			return () => {
				permissions.removeEventListener('change', setPermissions);
			};
		};

		checkPermissions();
	}, []);

	const stopRecording = () => {
		setIsRecording(false);
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const blob = new Blob(audioChunks, { type: 'audio/mp3' });
			const audioURL = URL.createObjectURL(blob);

			setAudio(audioURL);
			setAudioBlob(blob);
			setAudioChunks([]);
		};
	};

	const toggleRecording = () => {
		isRecording ? stopRecording() : startRecording();
	};

	const getAudioCorrection = async () => {
		setIsFetchingScore(true);
		try {
			const correction = await scoreVoice(audioBlob, gameId);

			correction.correct ? onCorrectAnswer() : onWrongAnswer();

			setAudioCorrection(correction);
		} catch (e: any) {
			console.error('modules service error', e.message);
		} finally {
			setIsFetchingScore(false);
			setAudioBlob(null);
			setAudio(null);
			setAudioChunks([]);
		}
	};

	const audioPlayerRef = useRef<any>(null);

	if (!hasAudioPermissions) {
		return (
			<div className="bg-white rounded-lg text-center p-4 space-y-6 max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-primary">¿Nos das permiso?</h1>
				<Image
					src="/img/mic-permission.svg"
					alt="permisos"
					height={500}
					width={500}
					className="mx-auto"
				/>
				<p className="text-xl text-pretty">
					Necesitamos que nos permitas usar el microfono para poder evaluarte :)
				</p>
				<Button onClick={allowMicrophone} className="text-center">
					Permitir
				</Button>
			</div>
		);
	}

	const disableCheckButton =
		audioCorrection?.correct || outOfRetries ? false : !audio;

	return (
		<GameLayout
			gameFinished={audioCorrection?.correct}
			wrongAttempt={audioCorrection?.correct === false}
			outOfRetries={outOfRetries}
			handleNextButton={handleNextButton}
			title="Repetí la palabra"
			gameInstructions={gameInstructions} //TODO mover al archivo
			checkGame={getAudioCorrection}
			gameCheckButtonDissabledLoading={isFetchingScore}
			gameCheckButtonDissabled={disableCheckButton}
		>
			<div className="max-w-xl mx-auto space-y-10 sm:space-y-16 md:space-y-20">
				<VoiceRecognitionGameButtons
					onPlayClick={playCorrectAnswerTTS}
					onRecordClick={handleRecordButton}
					onCheckClick={() => audioPlayerRef.current!.play()}
					isRecording={isRecording}
					recordDisabled={
						isFetchingScore || outOfRetries || audioCorrection?.correct
					}
					checkDisabled={!Boolean(audio)}
				/>
				{audio && (
					<audio src={audio} ref={audioPlayerRef} className="hidden"></audio>
				)}

				<p className="bubble text-sm sm:text-md md:text-xl md:font-light p-3 sm:p-6 md:p-8">
					{audioCorrection?.corrections || '¡Buena suerte!'}
				</p>

				<div className="relative m-10 h-24 sm:h-30 md:h-36">
					<Image
						src="/img/games/talking.svg"
						fill
						objectFit="contain"
						alt="lombriz hablando"
					/>
				</div>
			</div>
		</GameLayout>
	);
};

export default VoiceRecognitionGame;
