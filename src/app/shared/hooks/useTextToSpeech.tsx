'use client';

import { useEffect, useState } from 'react';

const VOICES_LIST = [
    "Microsoft Valentina Online (Natural) - Spanish (Uruguay)",
    "Microsoft Tomas Online (Natural) - Spanish (Argentina)",
    "Google español"
]
let foundVoice: SpeechSynthesisVoice | undefined;

export default function useTextToSpeech(texto: string) {

    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
    const [isPaused, setisPaused] = useState(false);

    //Esto previene que use el idioma por default cuando ingresa
    useEffect(() => {
        setSynth(window.speechSynthesis);

        for (const preferredName of VOICES_LIST) {
            foundVoice = synth?.getVoices().find(voice => voice.name === preferredName);
            if (foundVoice) { break; }
        }

        if (!foundVoice) {
            //Si no encuentro ninguna elegida por nosotros, seteo la primera que sea de español
            const langRegex = /^es(-[a-z]{2})?$/i;
            foundVoice = synth?.getVoices().find((voice) => langRegex.test(voice.lang));
        }

        return () => {
            synth?.cancel();
        };
    });

    const handlePlay = () => {
        if(synth?.speaking){
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