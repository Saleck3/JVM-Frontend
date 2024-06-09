'use client';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { scoreVoice } from '../services/exercises.service';
import useTextToSpeech from '../hooks/useTextToSpeech';
import useUserData from '../hooks/useUserData';
import { FaMicrophone } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import { MdHearing } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

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
						<FaMicrophone className="text-3xl" />
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
					className="w-full text-md"
					onClick={getAudioCorrection}
					disabled={!audioBlob || isFetchingScore}
					variant={'defaultWithIcon'}
				>
					{isFetchingScore ? (
						<FaSpinner className="animate-spin text-xl" />
					) : (
						<>
							<MdHearing className="text-xl" /> Comprobar
						</>
					)}
				</Button>
			)}
		</div>
	);
};

export default VoiceRecognitionGame;
