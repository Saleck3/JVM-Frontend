import {
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
	Accordion,
} from '@/components/ui/accordion';
import faqs from '../data/faqs';

export default function Faq() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 px-20 min-h-[80vh] lg:min-h-[50vh]">
			<div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
				<div>
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
						Preguntas frecuentes
					</h2>
				</div>
				<div>
					{faqs.map((faq, index) => (
						<Accordion collapsible type="single" key={faq.title}>
							<AccordionItem value={faq.title}>
								<AccordionTrigger className="text-base font-medium">
									{faq.title}
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
										{faq.description}
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div>
		</section>
	);
}
