import Features from './landing/Features/Features';
import Hero from './landing/Hero/Hero';
import Navbar from './shared/components/Navbar/Navbar';

export default function Landing() {
	return (
		<>
			<Navbar />
			<div className="container py-16 xl:px-20">
				<Hero />
				<Features />
			</div>
		</>
	);
}
