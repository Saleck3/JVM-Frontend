import Faq from '../components/Faq';
import faqs from '../data/faqs';
import { render, screen } from '@testing-library/react';

describe('Faq', () => {
	it('renders correctly', () => {
		render(<Faq />);

		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Preguntas frecuentes');
	});

	it('renders all faqs', () => {
		render(<Faq />);

		const faqList = screen.getAllByRole('heading', { level: 3 });
		expect(faqList).toHaveLength(faqs.length);
	});
});
