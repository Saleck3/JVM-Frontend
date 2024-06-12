import Image from 'next/image';

type Props = {
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	reverseRow?: boolean;
};

export default function Feature(props: Props): JSX.Element {
	const { title, description, imageSrc, imageAlt, reverseRow } = props;

	return (
		<div
			className={`gap-20 px-8 flex flex-col items-center justify-center text-center lg:text-left ${
				reverseRow ? 'lg:flex-row-reverse' : 'lg:flex-row'
			}`}
		>
			<Image
				alt={imageAlt}
				height="350"
				src={imageSrc}
				width="350"
				className="justify-self-center mx-auto mb-8 lg:mb-0 lg:mr-8"
			/>
			<div className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
					{title}
				</h2>
				<p className="mx-auto text-gray-600 text-pretty text-xl">{description}</p>
			</div>
		</div>
	);
}
