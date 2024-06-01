/*'use client';

import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { AudioRepeating } from '@/app/shared/types/games.type';
import Image from 'next/image';
import { parse } from 'path';

interface Props extends AudioRepeating {
	onWrongAnswer: () => void;
	onCorrectAnswer: () => void;
	handleNextButton: () => void;
}

const AudioRepeatingGame = (props: Props): JSX.Element => {
	const { correctAnswer, onWrongAnswer, onCorrectAnswer, handleNextButton } =
		props;
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);

	//estados grabadora
	const [isRecording, setIsRecording] = useState(false);
	const [stream, setStream] = useState(null);
	const [audioChunks, setAudioChunks] = useState([]);
	const [audio, setAudio] = useState(null);
	const mediaRecorder = useRef(null);
	const [hasAudioPermissions, setHasAudioPermissions] = useState(false);

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

		const media = new MediaRecorder(mediaStream, { type: 'audio/wav' });
		mediaRecorder.current = media;

		setIsRecording(true);

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (e) => {
			if (typeof e.data === 'undefined') return;
			if (e.data.size === 0) return;

			localAudioChunks.push(e.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const handleRecordButton = async () => {
		if (hasAudioPermissions) {
			toggleRecording();
		} else {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: true });
			} catch (e) {
				alert(
					'necesitamos permisos, aceptalos. Si los bloqueaste activalos en la configuración del navegador'
				);
			}
		}
	};

	useEffect(() => {
		const setPermissions = (permissions: any) => {
			setHasAudioPermissions(permissions.state === 'granted');
		};

		const checkPermissions = async () => {
			const permissions = await navigator.permissions.query({
				name: 'microphone',
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
			const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
			const audioURL = URL.createObjectURL(audioBlob);

			setAudio(audioURL);
			setAudioChunks([]);
		};
	};

	const toggleRecording = () => {
		isRecording ? stopRecording() : startRecording();
	};

	const handleCheck = () => {
		setIsIncorrect(false);
		setIsCorrect(true);

		if (true) {
			setIsCorrect(true);
			onCorrectAnswer();
		} else {
			setIsIncorrect(true);
			onWrongAnswer();
		}
	};

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
			<h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
				Repite la palabra
			</h1>
			<div className="mb-6 text-center">
				<div className="relative flex justify-center mb-8">
					<Image
						src="/img/icons/play-icon.svg"
						alt="play"
						className={`relative bg-accent rounded-full p-4 cursor-pointer active:bg-sky active:scale-110 transition-all 
							${isRecording ? 'animate-pulse bg-destructive' : ''}
							`}
						height={150}
						width={150}
						onClick={handleRecordButton}
					/>
				</div>
				{audio ? (
					<div className="audio-container">
						<audio src={audio} controls></audio>
					</div>
				) : null}
				{!isCorrect && (
					<Button className="w-full" onClick={handleCheck}>
						Comprobar
					</Button>
				)}
			</div>

			{isIncorrect && (
				<p className="text-red-500 text-center my-4">Incorrecto :(</p>
			)}

			{isCorrect && (
				<>
					<p className="text-green-500 text-center my-4">¡Correcto!</p>
					<Button className="w-full" onClick={handleNextButton}>
						Siguiente
					</Button>
				</>
			)}
		</div>
	);
};

export default AudioRepeatingGame;
*/