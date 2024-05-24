import CallToAction from './components/CallToAction';
import Faq from './components/Faq';
import Features from './components/Features';
import Hero from './components/Hero';

export default function Landing() {
	return (
		<>
			<div className="container py-16 xl:px-20">
				<Hero />
				<Features />
			</div>
			<CallToAction />
			<Faq />
		</>
	);
}
