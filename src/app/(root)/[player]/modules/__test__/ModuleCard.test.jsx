import { render, screen } from '@testing-library/react';
import ModuleCard from '../components/ModuleCard';

const mockModule = {
	description: 'Test module',
	recommended: true,
	id: 1,
	playerAlias: 'player1',
	progress: 0,
};

describe('ModuleCard Component', () => {
	it('should render the card with the correct data from props', () => {
		render(<ModuleCard {...mockModule} />);
		checkModuleCardContent(mockModule);
	});

	it('renders the recommended module variant when recommended is true', () => {
		render(<ModuleCard {...mockModule} recommended={true} />);
		checkRecommendedModuleVariant(true);
	});

	it('should not render the recommended module variant when recommended is false', () => {
		render(<ModuleCard {...mockModule} recommended={false} />);
		checkRecommendedModuleVariant(false);
	});
});

const checkModuleCardContent = (module) => {
	const label = screen.getByText(module.description.toUpperCase());
	const image = screen.getByAltText(module.description);

	expect(label).toBeInTheDocument();
	expect(image).toBeInTheDocument();
};

const checkRecommendedModuleVariant = (isRecommended) => {
	const recommended = screen.queryByText(/Módulo recomendado/);
	if (isRecommended) {
		expect(recommended).toBeInTheDocument();
	} else {
		expect(recommended).not.toBeInTheDocument();
	}
};
