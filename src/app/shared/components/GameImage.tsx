import useTextToSpeech from '../hooks/useTextToSpeech';
import Image from 'next/image';

type Props = {
    image?: string;
    tts: string;
};

export default function GameImage({ image, tts }: Props) {

    const [playAnswer] = useTextToSpeech(tts || '');
    return (
        <Image
            src={image ? image : "/img/icons/play-icon-mini.svg"}
            alt={tts}
            fill
            className="object-contain"
            onClick={playAnswer}
        />
    );
}