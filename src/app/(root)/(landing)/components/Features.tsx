import Feature from './Feature';
import features from '../data/featuresList';

export default function Features() {
	return (
		<section className="space-y-48 xl:px-20 py-32 lg:py-0 bg-gradient-to-b from-pink-200 to-yellow-200">
			{features.map((feature, index) => (
				<Feature
					key={feature.title}
					title={feature.title}
					description={feature.description}
					imageAlt={feature.imageAlt}
					imageSrc={feature.imageSrc}
					reverseRow={index % 2 !== 0}
				/>
			))}
		</section>
	);
}
