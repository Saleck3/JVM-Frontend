'use client';

import { useEffect, useState } from 'react';

const VOICES_LIST = [
    "Microsoft Valentina Online (Natural) - Spanish (Uruguay)",
    "Microsoft Tomas Online (Natural) - Spanish (Argentina)",
    "Google español"
]
export default function useTextToSpeech(texto: string) {

    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
    const [foundVoice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

    //Esto previene que use el idioma por default cuando ingresa
    useEffect(() => {
        setSynth(window.speechSynthesis);

        const prefferedVoice = synth?.getVoices().find(voice => voice.name === "Microsoft Valentina Online (Natural) - Spanish (Uruguay)") || null;

        const backupVoice = synth?.getVoices().find(voice => VOICES_LIST.includes(voice.name)) || null;
        //Si no encuentro ninguna elegida por nosotros, seteo la primera que sea de español
        const langRegex = /^es(-[a-z]{2})?$/i;
        const defaultVoice = synth?.getVoices().find((voice) => langRegex.test(voice.lang)) || null;

        setVoice(prefferedVoice || backupVoice || defaultVoice);

        return () => {
            synth?.cancel();
        };
    });

    const handlePlay = () => {
        if (synth?.speaking) {
            synth?.cancel();
            return;
        }
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.voice = foundVoice!;
        utterance.pitch = 1.2; //Tono, lo hace mas o menos aflautado
        utterance.volume = 1;

        synth?.speak(utterance);
    };

    return [handlePlay];
}