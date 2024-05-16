type Props = {
	title: string;
	subtitle: string;
};

export default function LeadTitle({ title, subtitle }: Props) {
	return (
		<div className="space-y-4 text-center">
			<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky">
				{title}
			</h1>
			<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
				{subtitle}
			</p>
		</div>
	);
}
