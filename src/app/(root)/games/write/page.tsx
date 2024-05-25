'use client';
import { useState } from 'react';
import WordWritingGame from '../components/WordWritingGame';
import { useRouter } from 'next/navigation';

export default function Write() {
	const router = useRouter();
	const [errorCounter, setErrorCounter] = useState(0);
	const imgSrc =
		'https://th.bing.com/th/id/OIP.BPksaE13E2ouIbiwUnt3qAAAAA?rs=1&pid=ImgDetMain';

	return (
		<div className="flex flex-col items-center justify-center mt-24">
			{Boolean(errorCounter) && (
				<div>🔥🔥🔥🔥🔥Errores: {errorCounter}🔥🔥🔥🔥🔥</div>
			)}
			<WordWritingGame
				word="Vaca"
				imgSrc={imgSrc}
				handleNextButton={() => router.push('/games/')}
				onWrongAnswer={() =>
					setErrorCounter((previousValue) => previousValue + 1)
				}
			/>
		</div>
	);
}
