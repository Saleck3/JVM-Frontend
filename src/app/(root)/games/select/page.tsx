'use client';
import { useRouter } from 'next/navigation';
import WordSelectionGame from '../components/WordSelectionGame';
import { useState } from 'react';

export default function Select() {
	const router = useRouter();
	const [errorCounter, setErrorCounter] = useState(0);
	const words = ['fumar', 'tero', 'naranja', 'vaca'];
	const correctWord = 'vaca';
	const imgSrc =
		'https://th.bing.com/th/id/OIP.BPksaE13E2ouIbiwUnt3qAAAAA?rs=1&pid=ImgDetMain';

	return (
		<div className="flex flex-col items-center justify-center mt-24">
			{Boolean(errorCounter) && (
				<div>🔥🔥🔥🔥🔥Errores: {errorCounter}🔥🔥🔥🔥🔥</div>
			)}
			<WordSelectionGame
				words={words}
				correctWord={correctWord}
				imgSrc={imgSrc}
				handleNextButton={() => router.push('/games/')}
				onWrongAnswer={() =>
					setErrorCounter((previousValue) => previousValue + 1)
				}
			/>
		</div>
	);
}
