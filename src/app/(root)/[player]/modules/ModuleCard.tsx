import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	description: string;
	recommended?: boolean;
	id: number;
	playerNick: string;
	progress: number;
};

export default function ModuleCard({
	description,
	recommended = false,
	id,
	playerNick,
	progress,
}: Props): JSX.Element {
	const dropShadow = recommended
		? 'drop-shadow-[0_10px_10px_hsl(var(--primary))]'
		: 'shadow-lg';
	return (
		<Card className={`text-center ${dropShadow}`} style={{ width: 280 }}>
			<CardHeader>
				<CardTitle className="text-sky font-semibold">
					{recommended && <span>⭐</span>}
					{description.toUpperCase()}
				</CardTitle>
				<CardDescription className="text-yellow-400 font-bold">
					<span className="text-sm">{progress.toFixed(2)}%</span>
					<br />
					{recommended ? 'Módulo recomendado' : '\u00A0'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Image
					src={`/img/modules/module-${id}.svg`}
					alt={`Modulo ${description}`}
					width={200}
					height={200}
					className="m-auto"
				/>
			</CardContent>
			<CardFooter>
				<Link href={`/${playerNick}/modules/${id}`} className="w-full">
					<Button className="w-full">Ver módulo</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
