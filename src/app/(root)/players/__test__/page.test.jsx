import PlayerSelection from '../page';
import { render, screen } from '@testing-library/react';

describe('Players page', () => {
	it('should render correctly', async () => {
		render(await PlayerSelection());

		checkPlayerSelectionPageRender();
	});
});

const checkPlayerSelectionPageRender = () => {
	const title = screen.getByRole('heading', { level: 1 });
	expect(title).toHaveTextContent(/Selección de jugador/);
};
