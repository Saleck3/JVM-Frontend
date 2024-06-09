import Image from 'next/image';

export default function FetchingScore() {
	return (
		<div className="bg-gray h-screen flex flex-col items-center justify-center gap-8 p-10">
			<p className="text-6xl animate-spin">⚙️</p>
			<Image
				src="/img/scoring.svg"
				width={500}
				height={500}
				alt="felicitaciones"
			/>
			<p className="text-2xl font-bold text-conden text-center text-primary tracking-tighter">
				Calculando puntaje...
			</p>
		</div>
	);
}
