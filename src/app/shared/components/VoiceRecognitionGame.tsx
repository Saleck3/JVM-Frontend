'use client';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { scoreVoice } from '../services/exercises.service';
import useTextToSpeech from '../hooks/useTextToSpeech';
import { FaMicrophone } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import GameCheckButton from './GameCheckButton';
import GameInstructionsButton from './GameInstructionsButton';
import { RiUserVoiceFill } from 'react-icons/ri';
import '../styles/bubble.css';

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

	const onlyText = false;

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
	const [playInstructions] = useTextToSpeech(gameInstructions || '');

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
			<>
				<h1 className="text-3xl font-bold text-primary">¿Nos das permiso?</h1>
				<Image
					src="/img/mic-permission.svg"
					alt="permisos"
					height={500}
					width={500}
				/>
				<p className="text-xl text-pretty">
					Necesitamos que nos permitas usar el microfono para poder evaluarte :)
				</p>
				<Button onClick={allowMicrophone}>Permitir</Button>
			</>
		);
	}

	return (
		<>
			<div className="space-y-10 px-4">
				<div className="flex items-center justify-center gap-2 text-2xl">
					{gameInstructions && <RiUserVoiceFill onClick={playInstructions} />}
					<h1 className="font-bold text-gray-700">Repetí la palabra</h1>
				</div>
				<div className="flex justify-between items-center">
					<Image
						src="/img/icons/play-icon.svg"
						alt="play"
						className={`relative bg-accent rounded-3xl p-4 cursor-pointer active:bg-sky active:scale-105 transition-all min-w-24`}
						height={100}
						width={100}
						onClick={playCorrectAnswerTTS}
					/>
					<div className="flex flex-col gap-2">
						<Button
							onClick={handleRecordButton}
							className={`min-w-24 active:scale-110 transition-all ${
								isRecording ? 'animate-pulse bg-destructive' : ''
							} `}
						>
							<FaMicrophone
								className={`text-3xl ${isRecording ? 'animate-ping' : ''}`}
							/>
						</Button>
						<Button
							className="min-w-24 active:scale-110 transition-all"
							disabled={!Boolean(audio)}
							onClick={() => audioPlayerRef.current!.play()}
						>
							<HiSpeakerWave className="text-3xl" />
						</Button>
					</div>
				</div>

				<p className="bubble text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
					doloremque.
				</p>

				<div className="h-24 relative m-10">
					<Image
						src="/img/games/talking.svg"
						fill
						objectFit="contain"
						alt="lombriz hablando"
					/>
				</div>
			</div>
			<div className="bg-gray-200 absolute bottom-0 left-0 h-20 w-full px-10 flex items-center justify-end">
				<GameCheckButton
					onClick={
						audioCorrection?.correct || outOfRetries
							? handleNextButton
							: getAudioCorrection
					}
					wrongAttempt={audioCorrection?.correct === false}
					outOfRetries={outOfRetries}
					gameFinished={audioCorrection?.correct}
					loading={isFetchingScore}
					disabled={!audio && !outOfRetries && !audioCorrection?.correct}
				/>
			</div>
		</>
	);

	//TODO integrar a game layout
	//TODO pasar el diseno a game layout

	return (
		<div className="sm:bg-white sm:shadow-lg rounded-sm sm:p-8 w-full space-y-4">
			<div className="flex items-center justify-center gap-2 text-2xl bg-red-400">
				{gameInstructions && <RiUserVoiceFill onClick={playInstructions} />}
				<h1 className="font-bold text-gray-700">Repetí la palabra</h1>
			</div>
			<div className="flex justify-between">
				<Image
					src="/img/icons/play-icon.svg"
					alt="play"
					className={`relative bg-accent rounded-3xl p-4 cursor-pointer active:bg-sky active:scale-105 transition-all`}
					height={150}
					width={150}
					onClick={playCorrectAnswerTTS}
				/>

				<div className="flex flex-col gap-2 bg-red-400">
					<Button
						onClick={handleRecordButton}
						className={`h-[70px] w-full active:scale-110 transition-all ${
							isRecording ? 'animate-pulse bg-destructive' : ''
						} `}
					>
						<FaMicrophone
							className={`text-3xl ${isRecording ? 'animate-ping' : ''}`}
						/>
					</Button>
					<Button
						className="w-[70px] h-[70px] active:scale-105 transition-all"
						variant={'secondary'}
						disabled={!Boolean(audio)}
						onClick={() => audioPlayerRef.current!.play()}
					>
						<HiSpeakerWave className="text-3xl" />
					</Button>
				</div>
			</div>
			{audio && (
				<audio src={audio} ref={audioPlayerRef} className="hidden"></audio>
			)}
			{audioCorrection?.correct === false && (
				<p className="text-xl text-center text-gray-700 bg-accent rounded-lg p-2">
					📒 {audioCorrection.corrections}
				</p>
			)}
			<GameCheckButton
				onClick={
					audioCorrection?.correct || outOfRetries
						? handleNextButton
						: getAudioCorrection
				}
				wrongAttempt={audioCorrection?.correct === false}
				outOfRetries={outOfRetries}
				gameFinished={audioCorrection?.correct}
				loading={isFetchingScore}
				disabled={!audio && !outOfRetries && !audioCorrection?.correct}
			/>
		</div>
	);
};

export default VoiceRecognitionGame;
