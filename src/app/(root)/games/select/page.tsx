'use client';
import WordSelectionGame from '../components/WordSelectionGame';

export default function page() {
	const words = ['fumar', 'tero', 'naranja', 'vaca'];
	const correctWord = 'vaca';
	const imgSrc =
		'https://th.bing.com/th/id/OIP.BPksaE13E2ouIbiwUnt3qAAAAA?rs=1&pid=ImgDetMain';

	return (
		<div className="flex justify-center mt-24">
			<WordSelectionGame
				words={words}
				correctWord={correctWord}
				imgSrc={imgSrc}
				onWrongAnswer={() => console.log('maaaal')}
			/>
		</div>
	);
}
