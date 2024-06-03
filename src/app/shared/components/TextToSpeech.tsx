'use client';
import Image from 'next/image';

type Props = {
    texto: string;
};

export default function TextToSpeech({ texto }: Props) {
    const handlePlay = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);

        //Filtro las voces en español
        var langRegex = /^es(-[a-z]{2})?$/i;
        var voices = synth.getVoices().filter((voice) => langRegex.test(voice.lang));
        console.log(voices);

        //Se podria reemplazar con una variable que dependa del player
        var selectedVoice = voices.find((v) => v.name === "Google español");
        if (!selectedVoice) {
            //Si no encuentro la que busque, seteo la que tenga
            selectedVoice = voices[0];
        }

        utterance.voice = selectedVoice;
        utterance.pitch = 1.2; //Tono, lo hace mas o menos aflautado
        utterance.rate = 0.9; //Velocidad de la voz
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