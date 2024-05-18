import ModuleCard from '../ModuleCard';
import { render, screen } from '@testing-library/react';

const mockModule = {
	description: 'Test module',
	recommended: true,
	id: 1,
	playerNick: 'player1',
	progress: 0,
};

describe('ModuleCard', () => {
	it('renders the card with the correct data from props', () => {
		render(<ModuleCard {...mockModule} />);

		const label = screen.getByText(mockModule.description.toUpperCase());
		const image = screen.getByAltText(mockModule.description);

		expect(label).toBeInTheDocument();
		expect(image).toBeInTheDocument();
	});

	it('renders the recommended module variant when recommended is true', () => {
		render(<ModuleCard {...mockModule} recommended={true} />);

		const recommended = screen.getByText(/Módulo recomendado/);
		expect(recommended).toBeInTheDocument();
	});

	it('should not render the recommended module variant when recommended is false', () => {
		render(<ModuleCard {...mockModule} recommended={false} />);

		const recommended = screen.queryByText(/Módulo recomendado/);
		expect(recommended).not.toBeInTheDocument();
	});
});
