// @ts-ignore
import useSound from 'use-sound';

const useGameSounds = () => {
	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');
	const [playFinishedSound] = useSound('/sounds/ff_fanfare.mp3');

	return { playCorrectSound, playWrongSound, playFinishedSound };
};

export default useGameSounds;
