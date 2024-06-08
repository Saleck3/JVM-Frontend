import { start } from 'repl';
import { getApples } from '../apples.service';

beforeAll(() => {
	global.fetch = jest.fn();
});

const mockResponse = { data: { apples: [{ id: 1, name: 'A', crowns: 1 }] } };
const formattedResponse = [{ id: 1, name: 'A', stars: 1 }];

describe('Apples service', () => {
	it('should make a request to apples internal api with playerId and moduleId', () => {
		setFetchMockResponse();

		const response = getApples(1, 2, 'token');
		expect(response).resolves.toEqual(formattedResponse);

		checkIfFetchWasCalledWithCorrectParams();
	});
});

const setFetchMockResponse = () => {
	fetch.mockResolvedValue({
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
