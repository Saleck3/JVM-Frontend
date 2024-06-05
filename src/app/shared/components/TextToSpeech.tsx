'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';


type Props = {
    texto: string;
};

export default function TextToSpeech({ texto }: Props) {

    const [synth, setSynth] = useState(window.speechSynthesis);

    //Esto previene que use el idioma por default cuando ingresa
    useEffect(() => {
        return () => {
            synth.cancel();
        };
    });

    const handlePlay = () => {
        const utterance = new SpeechSynthesisUtterance(texto);
        var selectedVoice;

        //Edge
        if (!selectedVoice) {
            selectedVoice = synth.getVoices().find((v) => v.name === "Microsoft Valentina Online (Natural) - Spanish (Uruguay)");
            utterance.rate = 0.9;
        }
        if (!selectedVoice) {
            selectedVoice = synth.getVoices().find((v) => v.name === "Microsoft Tomas Online (Natural) - Spanish (Argentina)");
            utterance.rate = 0.9;
        }

        //Chrome
        if (!selectedVoice) {
            selectedVoice = synth.getVoices().find((v) => v.name === "Google español");
            utterance.rate = 0.8;
        }

        if (!selectedVoice) {
            //Si no encuentro ninguna elegida por nosotros, seteo la primera que sea de español
            var langRegex = /^es(-[a-z]{2})?$/i;
            var voices = synth.getVoices().filter((voice) => langRegex.test(voice.lang));
            selectedVoice = voices[0];
            utterance.rate = 0.9;
        }

        utterance.voice = selectedVoice;
        utterance.pitch = 1.2; //Tono, lo hace mas o menos aflautado
        utterance.volume = 1;
        synth.speak(utterance);
    };

    return (
        <div className="mb-6 text-center">
            <Image
                src="/img/icons/play-icon.svg"
                alt="Play button"
                className="object-cover mx-auto mb-6"
                height={300}
                width={200}
                onClick={handlePlay}
            />
        </div>
    );
}