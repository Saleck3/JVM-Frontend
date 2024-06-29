import { adaptExercises, adaptScore } from '../exercises.adapter';

describe('Data Adapters', () => {
	describe('adaptExercises', () => {
		it('should correctly adapt exercise data', () => {
			const inputData = {
				moduleId: 123,
				exercises: [
					{
						id: 1,
						exerciseType: 'cardio',
						parameters: JSON.stringify({ duration: 30, intensity: 'high' }),
					},
					{
						id: 2,
						exerciseType: 'strength',
						parameters: JSON.stringify({ sets: 3, reps: 12 }),
					},
				],
			};

			const expectedOutput = {
				moduleId: 123,
				exercises: [
					{
						id: 1,
						exerciseType: 'cardio',
						params: { duration: 30, intensity: 'high' },
					},
					{
						id: 2,
						exerciseType: 'strength',
						params: { sets: 3, reps: 12 },
					},
				],
			};

			const result = adaptExercises(inputData);

			expect(result).toEqual(expectedOutput);
		});

		it('should handle empty exercise data', () => {
			const inputData = {
				moduleId: 456,
				exercises: [],
			};

			const expectedOutput = {
				moduleId: 456,
				exercises: [],
			};

			const result = adaptExercises(inputData);

			expect(result).toEqual(expectedOutput);
		});
	});

	describe('adaptScore', () => {
		it('should return the data as is', () => {
			const inputData = {
				score: 85,
				maxScore: 100,
			};

			const result = adaptScore(inputData);

			expect(result).toEqual(inputData);
		});
	});
});
