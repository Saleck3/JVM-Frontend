'use client';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { scoreVoice } from '../services/exercises.service';
import useTextToSpeech from '../hooks/useTextToSpeech';
import useUserData from '../hooks/useUserData';

type Props = {
	gameId: string;
	playerId: string;
	correctAnswer: string;
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
	outOfRetries: boolean;
};

const VoiceRecognitionGame = (props: Props): JSX.Element => {
	const {
		gameId,
		correctAnswer,
		onCorrectAnswer,
		onWrongAnswer,
		handleNextButton,
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

	const { token } = useUserData();

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

	const getAudioCorrection = async () => {
		setIsFetchingScore(true);
		try {
			const correction = await scoreVoice(audioBlob, gameId, token!);

			correction.correct ? onCorrectAnswer() : onWrongAnswer();

			setAudioCorrection(correction);
		} catch (e: any) {
			console.error('modules service error', e.message);
		} finally {
			setIsFetchingScore(false);
		}
	};

	return (
		<div className="bg-white rounded-sm shadow-lg p-8 space-y-8">
			<h1 className="text-3xl md:text-5xl font-boldtext-center text-gray-700">
				Repite la palabra
			</h1>
			<div className="flex gap-4 gap-x-8 justify-center">
				<Image
					src="/img/icons/play-icon.svg"
					alt="play"
					className={`relative bg-accent rounded-3xl p-4 cursor-pointer active:bg-sky active:scale-105 transition-all`}
					height={150}
					width={150}
					onClick={playCorrectAnswerTTS}
				/>
				<div className="flex flex-col gap-2">
					<Button
						onClick={handleRecordButton}
						className={`w-[70px] h-[70px] active:scale-110 transition-all ${
							isRecording ? 'animate-pulse bg-destructive' : ''
						} `}
					>
						<RecordIcon />
					</Button>
					<Button
						className="w-[70px] h-[70px] active:scale-105 transition-all"
						variant={'secondary'}
						disabled={!Boolean(audio)}
						onClick={() => audioPlayerRef.current!.play()}
					>
						<PlayIcon />
					</Button>
				</div>
			</div>
			{audio && (
				<audio src={audio} ref={audioPlayerRef} className="hidden"></audio>
			)}
			{audioCorrection && (
				<p className="text-xl text-center text-gray-700 bg-accent rounded-lg p-2">
					📒 {audioCorrection.corrections}
				</p>
			)}
			{audioCorrection?.correct ? (
				<Button
					className="w-full"
					variant={'success'}
					onClick={handleNextButton}
				>
					Siguiente
				</Button>
			) : (
				<Button
					className="w-full"
					onClick={getAudioCorrection}
					disabled={!audioBlob || isFetchingScore}
				>
					{isFetchingScore ? (
						<span className="animate-spin">🚬</span>
					) : (
						'Evaluar'
					)}
				</Button>
			)}
		</div>
	);
};

const RecordIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 422 717"
		>
			<path
				fill="currentColor"
				d="M85 207v-95C85 51 140 0 210 0c69 0 125 51 125 112v95H85zm337 6v191c-41 112-162 129-162 129v127h133v57H27v-57h134V533S41 516 0 404V213l49-23v174s15 117 161 117s163-117 163-117V190zm-87 27v86c0 61-56 112-125 112c-70 0-125-51-125-112v-86h250z"
			/>
		</svg>
	);
};

const PlayIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 20 20"
		>
			<path
				fill="currentColor"
				d="M5.312 4.566C4.19 5.685-.715 12.681 3.523 16.918c4.236 4.238 11.23-.668 12.354-1.789c1.121-1.119-.335-4.395-3.252-7.312c-2.919-2.919-6.191-4.376-7.313-3.251zm9.264 9.59c-.332.328-2.895-.457-5.364-2.928c-2.467-2.469-3.256-5.033-2.924-5.363c.328-.332 2.894.457 5.36 2.926c2.471 2.467 3.258 5.033 2.928 5.365zm.858-8.174l1.904-1.906a.999.999 0 1 0-1.414-1.414L14.02 4.568a.999.999 0 1 0 1.414 1.414zM11.124 3.8a1 1 0 0 0 1.36-.388l1.087-1.926a1 1 0 0 0-1.748-.972L10.736 2.44a1 1 0 0 0 .388 1.36zm8.748 3.016a.999.999 0 0 0-1.36-.388l-1.94 1.061a1 1 0 1 0 .972 1.748l1.94-1.061a1 1 0 0 0 .388-1.36z"
			/>
		</svg>
	);
};

export default VoiceRecognitionGame;
