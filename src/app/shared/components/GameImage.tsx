import useTextToSpeech from '../hooks/useTextToSpeech';
import Image from 'next/image';

type Props = {
	image?: string;
	tts: string;
};

export default function GameImage({ image, tts }: Props) {
	console.log('image', image);

	const [playAnswer] = useTextToSpeech(tts || '');

	return (
		<Image
			src={image!}
			alt={tts}
			fill
			className="object-contain"
			onClick={playAnswer}
		/>
	);
}
