import {
	getExercises,
	getTest,
	scoreExercises,
	scoreVoice,
	scoreTest,
} from '../exercises.service';
import { getLectiData, getToken } from '../../../../lib/sessionUtils';
import { adaptExercises, adaptScore } from '../../adapters/exercises.adapter';

jest.mock('../../../../lib/sessionUtils', () => ({
	getLectiData: jest.fn(),
	getToken: jest.fn(),
}));

jest.mock('../../adapters/exercises.adapter', () => ({
	adaptExercises: jest.fn(),
	adaptScore: jest.fn(),
}));

describe('services', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('getExercises', () => {
		it('fetches exercises and adapts data successfully', async () => {
			const adaptedData = prepareGetExercisesMocks();

			const result = await getExercises('apple-id');

			checkIfGetExercisesResultIsCorrect(result, adaptedData);
		});

		it('throws an error on fetch failure', async () => {
			prepareGetExercisesError();

			await expect(getExercises('apple-id')).rejects.toThrow(
				'Exercises service request error: error - fetch error'
			);
		});
	});

	describe('getTest', () => {
		it('fetches test data and adapts it successfully', async () => {
			const adaptedData = prepareGetTestMocks();

			const result = await getTest();
			expect(result).toEqual(adaptedData);
		});

		it('throws an error on fetch failure', async () => {
			prepareGetTestError();

			await expect(getTest()).rejects.toThrow(
				'Exercises service request error: error - fetch error'
			);
		});
	});

	describe('scoreExercises', () => {
		it('posts score and adapts the score data', async () => {
			const adaptedScore = prepareScoreExercisesMocks();

			const result = await scoreExercises('apple-id', [1, 2, 3]);

			checkIfScoreExercisesResultIsCorrect(result, adaptedScore);
		});

		it('throws an error on fetch failure', async () => {
			prepareScoreExercisesError();

			await expect(scoreExercises('apple-id', [1, 2, 3])).rejects.toThrow(
				'Exercises service request error: error - fetch error'
			);
		});
	});

	const prepareScoreExercisesError = () => {
		const mockGetLectiData = getLectiData;

		mockGetLectiData.mockResolvedValue({
			token: { value: 'fake-token' },
			currentPlayer: { id: 'player-id' },
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ type: 'error', message: 'fetch error' }),
			})
		);
	};

	const checkIfScoreExercisesResultIsCorrect = (result, adaptedScore) => {
		expect(result).toEqual(adaptedScore);
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining(
				'/api/exercises/score?playerId=player-id&appleId=apple-id'
			),
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({ gameErrors: [1, 2, 3] }),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer fake-token`,
				},
			})
		);
	};

	const prepareScoreExercisesMocks = () => {
		const mockData = { some: 'data' };
		const adaptedScore = { adapted: 'score' };
		const mockGetLectiData = getLectiData;

		mockGetLectiData.mockResolvedValue({
			token: { value: 'fake-token' },
			currentPlayer: { id: 'player-id' },
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			})
		);

		adaptScore.mockReturnValue(adaptedScore);

		return adaptedScore;
	};

	describe('scoreVoice', () => {
		it('posts voice score and returns data', async () => {
			const mockData = { result: 'data' };
			const mockGetToken = getToken;

			mockGetToken.mockResolvedValue({ value: 'fake-token' });
			global.fetch = jest.fn(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockData),
				})
			);

			const result = await scoreVoice(new Blob(), 'exercise-id');
			expect(result).toEqual(mockData);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining(
					'/api/exercises/voice/score?exerciseId=exercise-id'
				),
				expect.objectContaining({
					method: 'POST',
					body: expect.any(Blob),
					headers: {
						'Content-Type': 'audio/mp3',
						Authorization: `Bearer fake-token`,
					},
				})
			);
		});

		it('throws an error on fetch failure', async () => {
			const mockGetToken = getToken;

			mockGetToken.mockResolvedValue({ value: 'fake-token' });
			global.fetch = jest.fn(() =>
				Promise.resolve({
					ok: false,
					json: () =>
						Promise.resolve({ type: 'error', message: 'fetch error' }),
				})
			);

			await expect(scoreVoice(new Blob(), 'exercise-id')).rejects.toThrow(
				'Exercises service request error: error - fetch error'
			);
		});
	});

	describe('scoreTest', () => {
		it('posts test score and returns data', async () => {
			const mockData = { result: 'data' };

			global.fetch = jest.fn(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockData),
				})
			);

			const result = await scoreTest([true, false, true]);
			expect(result).toEqual(mockData);
		});

		it('throws an error on fetch failure', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					ok: false,
					json: () =>
						Promise.resolve({ type: 'error', message: 'fetch error' }),
				})
			);

			await expect(scoreTest([true, false, true])).rejects.toThrow(
				'Exercises service request error: error - fetch error'
			);
		});
	});

	const prepareGetTestError = () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ type: 'error', message: 'fetch error' }),
			})
		);
	};

	const prepareGetTestMocks = () => {
		const mockData = { some: 'data' };
		const adaptedData = { adapted: 'data' };

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			})
		);

		adaptExercises.mockReturnValue(adaptedData);

		return adaptedData;
	};

	const prepareGetExercisesError = () => {
		const mockGetLectiData = getLectiData;
		mockGetLectiData.mockResolvedValue({
			token: { value: 'fake-token' },
			currentPlayer: { id: 'player-id' },
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ type: 'error', message: 'fetch error' }),
			})
		);
	};

	const prepareGetExercisesMocks = () => {
		const mockData = { some: 'data' };
		const adaptedData = { adapted: 'data' };
		const mockGetLectiData = getLectiData;

		mockGetLectiData.mockResolvedValue({
			token: { value: 'fake-token' },
			currentPlayer: { id: 'player-id' },
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			})
		);

		adaptExercises.mockReturnValue(adaptedData);

		return adaptedData;
	};

	const checkIfGetExercisesResultIsCorrect = (result, adaptedData) => {
		expect(result).toEqual(adaptedData);
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining(
				'/api/exercises?playerId=player-id&appleId=apple-id'
			),
			expect.objectContaining({
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer fake-token`,
				},
				cache: 'no-store',
			})
		);
	};
});
