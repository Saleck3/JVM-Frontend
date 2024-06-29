import { render } from '@testing-library/react';
import ApplePath from '../page';
import { getApples } from '@/app/shared/services/apples.service';

jest.mock('../../../../shared/services/apples.service.ts');

const mockApples = [{ id: 1, name: 'apple1' }];

beforeAll(() => {
	getApples.mockResolvedValue(mockApples);
});

describe('ApplePath Page', () => {
	it('renders correctly', async () => {
		render(await ApplePath({ params: { player: 'foo', moduleId: 1 } }));
		checkPageRender();
	});
});

const checkPageRender = () => {
	expect(ApplePath).toBeDefined();
};
