import { Button } from '@/components/ui/button';

type Props = {
	children: React.ReactNode;
	title: string;
	gameFinished: boolean;
	wrongAttempt?: boolean;
	outOfRetries?: boolean;
	handleNextButton: () => void;
};

export default function GameLayout(props: Props) {
	const {
		children,
		gameFinished,
		wrongAttempt,
		title,
		handleNextButton,
		outOfRetries,
	} = props;

	return (
		<div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-lg p-6 py-12 flex flex-col space-y-4">
			<h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-700">
				{title}
			</h1>

			{children}

			{wrongAttempt && !outOfRetries && (
				<p className="text-red-500 text-center">Incorrecto :(</p>
			)}

			{(gameFinished || outOfRetries) && (
				<>
					{gameFinished && (
						<p className="text-green-500 text-center">¡Correcto!</p>
					)}
					{outOfRetries && (
						<p className="text-red-500 text-center">
							Sos medio lerdo, continuemos con el próximo ejercicio
						</p>
					)}
					<Button className="w-full" onClick={handleNextButton}>
						Siguiente
					</Button>
				</>
			)}
		</div>
	);
}