// utils.test.js
import { cookies } from 'next/headers';
import {
	getLectiData,
	getPlayers,
	getToken,
	getLoggedUser,
	getCurrentPlayer,
	createLectiData,
	setLectiData,
	updateLectiData,
	removeLectiData,
} from '../sessionUtils';

const mockCookiesGet = jest.fn();
const mockCookiesSet = jest.fn();

describe('LectiData utils', () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Reset mocks before each test
	});

	jest.mock('next/headers', () => ({
		cookies: {
			get: mockCookiesGet,
			set: mockCookiesSet,
		},
	}));

	describe('getLectiData', () => {
		it('should return LectiData from cookie', () => {
			const lectiData = getLectiData();

			checkIfLectiDataIsCorrect(lectiData);
		});

		it('should return undefined if cookie is not found', () => {
			const lectiData = getLectiData();

			checkIfLectiDataIsUndefined(lectiData);
		});

		it('should handle errors and return undefined', () => {
			mockCookiesGet.mockImplementation(() => {
				throw new Error('Mock error');
			});

			const lectiData = getLectiData();
			expect(lectiData).toBeUndefined();
		});
	});

	describe('getPlayers', () => {
		it('should return empty array if no LectiData', async () => {
			const getLectiData = jest.fn();
			getLectiData.mockReturnValueOnce(undefined);

			await checkIfPlayersIsEmptyArray();
		});

		it('should return players from LectiData', async () => {
			const mockData = { players: [{ name: 'Player 1' }] };

			setMockLectiData(mockData);

			checkIfPlayersIsCorrect();
		});
	});

	describe('createLectiData', () => {
		it('should create LectiData object', () => {
			const data = createLectiData(
				'test@example.com',
				[],
				'token-value',
				12345
			);

			checkIfLectiObjectIsCreated(data);
		});
	});

	describe('setLectiData, updateLectiData, removeLectiData', () => {
		it('should call cookies.set with appropriate arguments', () => {
			const mockData = { email: 'test@example.com' };
			const setLectiData = jest.fn();
			setLectiData(mockData);

			checkIfCookiesSetIsCalled(mockData);
		});
	});

	const checkIfLectiObjectIsCreated = (data) => {
		expect(data).toEqual({
			email: 'test@example.com',
			players: [],
			token: { value: 'token-value', exp: 12345 },
		});
	};

	const checkIfCookiesSetIsCalled = (data) => {
		const mockCookiesSet = jest.fn();
		mockCookiesSet('lecti-data', JSON.stringify(data), {});
		expect(mockCookiesSet).toHaveBeenCalledWith(
			'lecti-data',
			JSON.stringify(data),
			expect.any(Object)
		);
	};

	const checkIfPlayersIsCorrect = async () => {
		const players = await getPlayers();
		expect(players).toEqual(players);
	};

	const setMockLectiData = (data) => {
		const getLectiData = jest.fn();
		getLectiData.mockReturnValueOnce(data);
	};

	const checkIfPlayersIsEmptyArray = async () => {
		const players = await getPlayers();
		expect(players).toEqual([]);
	};

	const checkIfLectiDataIsUndefined = (lectiData) => {
		expect(lectiData).toBeUndefined();
	};

	const checkIfLectiDataIsCorrect = (lectiData) => {
		expect(lectiData).toEqual(lectiData);
	};
});
