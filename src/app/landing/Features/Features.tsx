import Feature from './Feature';
import features from './featuresList';

export default function Features() {
	return (
		<section className="space-y-48">
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
