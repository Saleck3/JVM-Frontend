import { Modal } from '@/app/shared/components/Modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
	completedPercentage: number;
	moduleUrl?: string;
};

export default function ProgressBar({ completedPercentage, moduleUrl }: Props) {
	return (
		<div className="w-full max-w-4xl flex items-center gap-4 mt-4 mx-auto">
			{moduleUrl && (
				<Modal triggerButton={<button>✖️</button>} title="¿Volver al módulo?">
					<div className="flex flex-col gap-8 text-center">
						<p>¡Vas a perder tu progreso!</p>
						<Link href={moduleUrl}>
							<Button className="w-full">Cerrar juego</Button>
						</Link>
					</div>
				</Modal>
			)}
			<div className="w-full h-5 rounded bg-gray-400 flex relative">
				<div
					className="h-full bg-primary transition-all duration-1000 rounded w-[50%]"
					style={{ width: `${completedPercentage}%` }}
				></div>
				<span className="absolute m-auto left-1/2 right-1/2 text-white font-semibold">
					{!isNaN(completedPercentage) && `${completedPercentage}%`}
				</span>
			</div>
		</div>
	);
}
