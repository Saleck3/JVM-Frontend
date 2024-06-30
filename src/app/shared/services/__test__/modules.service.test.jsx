import { getModules } from '../modules.service';
import { getToken } from '@/lib/sessionUtils';

jest.mock('../../../../lib/sessionUtils.ts', () => ({
	getToken: jest.fn(),
}));

beforeAll(() => {
	global.fetch = jest.fn();
	getToken.mockResolvedValue({
		value: 'mock-token',
	});
});

const mockResponse = [{ id: 1, description: 'module' }];

describe('Modules service', () => {
	it('makes a request to modules internal api with correct params', async () => {
		setFetchMockResponse();

		const response = await getModules('1');
		expect(response).toEqual(mockResponse);

		checkIfFetchWasCalledWithCorrectParams();
	});
});

const setFetchMockResponse = () => {
	fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => mockResponse,
	});
};

const checkIfFetchWasCalledWithCorrectParams = () => {
	expect(fetch).toHaveBeenCalledWith(
		expect.stringContaining('/modules?playerId=1'),
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer mock-token',
			},
		}
	);
};
