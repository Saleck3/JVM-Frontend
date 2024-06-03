import { Modal } from '@/app/shared/components/Modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
	completedPercentage: number;
	moduleUrl: string;
};

export default function ProgressBar({ completedPercentage, moduleUrl }: Props) {
	return (
		<div className="w-full max-w-4xl flex items-center gap-4">
			<Modal triggerButton={<button>✖️</button>} title="¿Volver al modulo?">
				<div className="flex flex-col gap-8 text-center">
					<p>¡Vas a perder tu progreso!</p>
					<Link href={moduleUrl}>
						<Button className="w-full">Cerrar juego</Button>
					</Link>
				</div>
			</Modal>
			<div className="w-full h-5 rounded bg-gray-400">
				<div
					className="h-full bg-primary transition-all duration-1000 rounded w-[50%]"
					style={{ width: `${completedPercentage}%` }}
				></div>
			</div>
		</div>
	);
}
