import ModuleCard from '../ModuleCard';
import modulesList from '../modulesList';
import { render, screen } from '@testing-library/react';

const moduleToRender = modulesList[0];

describe('ModuleCard', () => {
	it('renders the card with the correct data from props', () => {
		render(<ModuleCard {...moduleToRender} />);

		const label = screen.getByText(moduleToRender.label.toUpperCase());
		const image = screen.getByAltText(moduleToRender.label);

		expect(label).toBeInTheDocument();
		expect(image).toBeInTheDocument();
	});

	it('renders the recommended module variant when recommended is true', () => {
		render(<ModuleCard {...moduleToRender} recommended={true} />);

		const recommended = screen.getByText(/Módulo recomendado/);
		expect(recommended).toBeInTheDocument();
	});

	it('should not render the recommended module variant when recommended is false', () => {
		render(<ModuleCard {...moduleToRender} recommended={false} />);

		const recommended = screen.queryByText(/Módulo recomendado/);
		expect(recommended).not.toBeInTheDocument();
	});
});
