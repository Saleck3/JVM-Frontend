import { getApples } from '../apples.service';
import { mockCookies } from '../../../shared/mockData/cookiesMock';
import { getLectiData } from '@/lib/sessionUtils';

jest.mock('../../../../lib/sessionUtils.ts', () => ({
	getLectiData: jest.fn(),
}));

beforeAll(() => {
	global.fetch = jest.fn();

	getLectiData.mockResolvedValue({
		token: { value: "token" }, currentPlayer: mockCookies.currentPlayer
	});
});

const mockResponse = [{ id: 1, name: 'A', score: 1, appleType: "NO_IA" }];
const formattedResponse = [{ id: 1, name: 'A', stars: 1, type: "NO_IA" }];

describe('Apples service', () => {
	it('should make a request to apples internal api with playerId and moduleId', async () => {
		setFetchMockResponse();

		const response = await getApples('2');
		expect(response).toEqual(formattedResponse);

		checkIfFetchWasCalledWithCorrectParams();
	});
});

const setFetchMockResponse = () => {
	fetch.mockResolvedValue({
		ok: true,
		json: () => Promise.resolve(mockResponse),
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
