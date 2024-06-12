'use client';

import { useEffect, useState } from 'react';

const PREFERRED_VOICES = [
	'Microsoft Valentina Online (Natural) - Spanish (Uruguay)',
	'Microsoft Tomas Online (Natural) - Spanish (Argentina)',
	'Google español',
];

export default function useTextToSpeech(text: string) {
	const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
	const [foundVoice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

	useEffect(() => {
		const _synth = window.speechSynthesis;
		setSynth(_synth);

		const prefferedVoice =
			_synth
				?.getVoices()
				.find(
					(voice) =>
						voice.name ===
						'Microsoft Valentina Online (Natural) - Spanish (Uruguay)'
				) || null;

		const backupVoice =
			_synth
				?.getVoices()
				.find((voice) => PREFERRED_VOICES.includes(voice.name)) || null;

		const langRegex = /^es(-[a-z]{2})?$/i;
		const defaultVoice =
			_synth?.getVoices().find((voice) => langRegex.test(voice.lang)) || null;

		setVoice(prefferedVoice || backupVoice || defaultVoice);

		return () => {
			_synth.cancel();
			synth?.cancel();
		};
	}, [synth]);

	const handlePlay = () => {
		if (synth?.speaking) {
			synth?.cancel();
			return;
		}
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = foundVoice!;
		utterance.rate = 0.9;
		utterance.pitch = 1.2;
		utterance.volume = 1;

		synth?.speak(utterance);
	};

	return [handlePlay];
}
