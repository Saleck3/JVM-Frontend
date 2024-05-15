import CallToAction from './landing/CallToAction/CallToAction';
import Faq from './landing/Faq/Faq';
import Features from './landing/Features/Features';
import Hero from './landing/Hero/Hero';
import Footer from '@/app/shared/components/Footer/Footer';
import Navbar from '@/app/shared/components/Navbar/Navbar';

export default function Landing() {
	return (
		<>
			<Navbar />
			<div className="container py-16 xl:px-20">
				<Hero />
				<Features />
			</div>
			<CallToAction />
			<Faq />
			<Footer />
		</>
	);
}
