import { getApples } from '../apples.service';

beforeAll(() => {
	global.fetch = jest.fn();
});

const mockResponse = [{ id: 1, name: 'apple1' }];

describe('Apples service', () => {
	it('should make a request to apples internal api with playerId and moduleId', () => {
		setFetchMockResponse();

		const response = getApples(1, 2, 'token');
		expect(response).resolves.toEqual(mockResponse);

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
		expect.stringContaining(`/apples/?playerId=1&moduleId=2`),
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer token',
			},
			method: 'GET',
		}
	);
};
