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
	label: string;
	recommended?: boolean;
	imgSrc: string;
	slug: string;
};

export default function ModuleCard({
	label,
	recommended = false,
	imgSrc,
	slug,
}: Props): JSX.Element {
	const dropShadow = recommended
		? 'drop-shadow-[0_10px_10px_hsl(var(--primary))]'
		: 'shadow-lg';
	return (
		<Card className={`text-center mx-6 ${dropShadow}`} style={{ width: 280 }}>
			<CardHeader>
				<CardTitle className="text-sky font-semibold">
					{recommended && <span>⭐</span>}
					{label.toUpperCase()}
				</CardTitle>
				<CardDescription className="text-yellow-400 font-bold">
					{recommended ? 'Módulo recomendado' : '\u00A0'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Image
					src={imgSrc}
					alt="Module 1"
					width={200}
					height={200}
					className="m-auto"
				/>
			</CardContent>
			<CardFooter>
				<Link href={`/modules/${slug}`} className="w-full">
					<Button className="w-full">Ver módulo</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
