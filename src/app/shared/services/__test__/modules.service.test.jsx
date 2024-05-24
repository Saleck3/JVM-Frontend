import { getModules } from '../modules.service';

beforeAll(() => {
	global.fetch = jest.fn();
});

describe('Modules service', () => {
	it('makes a request to modules internal api with correct params', () => {
		const mockResponse = {
			data: { modules: [{ id: 1, description: 'module' }] },
		};
		const mockHeaders = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer token',
		};

		fetch.mockResolvedValueOnce({
			json: async () => mockResponse,
		});

		const response = getModules(1, 'token');

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining(`/modules?playerId=1`),
			{
				headers: mockHeaders,
				method: 'GET',
			}
		);
		expect(response).resolves.toEqual(mockResponse.data.modules);
	});
});
