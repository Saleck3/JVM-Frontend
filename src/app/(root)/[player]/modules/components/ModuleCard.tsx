import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaGamepad } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from '../../../../shared/components/ProgressBar';

type Props = {
	description: string;
	recommended?: boolean;
	id: number;
	playerAlias: string;
	progress: number;
};

export default function ModuleCard({
	description,
	recommended = false,
	id,
	playerAlias,
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
				<CardDescription>
					<ProgressBar completedPercentage={progress} />
					{recommended ? (
						<span className="text-purple-400 font-semibold">
							Módulo recomendado
						</span>
					) : (
						'\u00A0'
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Image
					src={`/img/modules/module-${id}.svg`}
					alt={description}
					width={200}
					height={200}
					className="m-auto"
				/>
			</CardContent>
			<CardFooter>
				<Link href={`/${playerAlias}/modules/${id}`} className="w-full">
					<Button className="w-full text-md" variant={'defaultWithIcon'}>
						<FaGamepad className="text-2xl" />
						JUGAR
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
