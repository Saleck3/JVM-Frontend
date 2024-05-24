import { getModules } from '../modules.service';

beforeAll(() => {
	global.fetch = jest.fn();
});

const mockResponse = {
	data: { modules: [{ id: 1, description: 'module' }] },
};

describe('Modules service', () => {
	it('makes a request to modules internal api with correct params', () => {
		setFetchMockResponse();

		const response = getModules(1, 'token');
		expect(response).resolves.toEqual(mockResponse.data.modules);

		checkIfFetchWasCalledWithCorrectParams();
	});
});

const setFetchMockResponse = () => {
	fetch.mockResolvedValueOnce({
		json: async () => mockResponse,
	});
};

const checkIfFetchWasCalledWithCorrectParams = () => {
	expect(fetch).toHaveBeenCalledWith(
		expect.stringContaining(`/modules?playerId=1`),
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer token',
			},
			method: 'GET',
		}
	);
};
