// @ts-ignore
import useSound from 'use-sound';

const useGameSounds = () => {
	const [playCorrectSound] = useSound('/sounds/success.mp3');
	const [playWrongSound] = useSound('/sounds/wrong.mp3');

	return { playCorrectSound, playWrongSound };
};

export default useGameSounds;
