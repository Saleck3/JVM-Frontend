'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WordOrderingGame from '../components/WordOrderingGame';

export default function Drag() {
	const router = useRouter();
	const [errorCounter, setErrorCounter] = useState(0);
	const imgSrc =
		'https://th.bing.com/th/id/OIP.BPksaE13E2ouIbiwUnt3qAAAAA?rs=1&pid=ImgDetMain';

	return (
		<div className="flex flex-col items-center justify-center mt-24">
			{Boolean(errorCounter) && (
				<div>🔥🔥🔥🔥🔥Errores: {errorCounter}🔥🔥🔥🔥🔥</div>
			)}
			<WordOrderingGame
				words={['Mundo', 'Cruel', 'Adios']}
				correctPhrase="Adios Mundo Cruel"
				correctPhraseSound="someSoundOrUrl"
				handleNextButton={() => router.push('/games/')}
				onWrongAnswer={() =>
					setErrorCounter((previousValue) => previousValue + 1)
				}
			/>
		</div>
	);
}
