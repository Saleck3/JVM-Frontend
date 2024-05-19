import CallToAction from './CallToAction/CallToAction';
import Faq from './Faq/Faq';
import Features from './Features/Features';
import Hero from './Hero/Hero';

export default function Landing() {
	return (
		<main>
			<div className="container py-16 xl:px-20">
				<Hero />
				<Features />
			</div>
			<CallToAction />
			<Faq />
		</main>
	);
}
