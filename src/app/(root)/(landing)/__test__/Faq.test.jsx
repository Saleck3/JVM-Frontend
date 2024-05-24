import Faq from '../components/Faq';
import faqs from '../data/faqs';
import { render, screen } from '@testing-library/react';

const checkMainHeading = () => {
	const heading = screen.getByRole('heading', { level: 2 });
	expect(heading).toBeInTheDocument();
	expect(heading).toHaveTextContent('Preguntas frecuentes');
};

const checkFaqItemsCount = (expectedCount) => {
	const faqList = screen.getAllByRole('heading', { level: 3 });
	expect(faqList).toHaveLength(expectedCount);
};

describe('FAQ Component', () => {
	it('should render the FAQ component with the correct heading', () => {
		render(<Faq />);

		checkMainHeading();
	});

	it('should render all FAQ items', () => {
		render(<Faq />);
		checkFaqItemsCount(faqs.length);
	});
});
