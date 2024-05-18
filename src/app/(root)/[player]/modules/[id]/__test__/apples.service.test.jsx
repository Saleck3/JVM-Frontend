import { getApples } from '../services/apples.service';

beforeAll(() => {
	global.fetch = jest.fn();
});

describe('Apples service', () => {
	it('makes a request to apples internal api with correct params', () => {
		const mockResponse = [{ id: 1, name: 'apple1' }];
		const mockHeaders = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer token',
		};

		fetch.mockResolvedValueOnce({
			json: async () => mockResponse,
		});

		const response = getApples(1, 2, 'token');

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining(`/apples/?playerId=1&moduleId=2`),
			{
				headers: mockHeaders,
				method: 'GET',
			}
		);
		expect(response).resolves.toEqual(mockResponse);
	});
});
