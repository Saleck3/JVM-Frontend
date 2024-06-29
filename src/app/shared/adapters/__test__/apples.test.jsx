import { adaptApple, adaptApples } from '../apples.adapter';

describe('Apple Adapters', () => {
	describe('adaptApple', () => {
		it('should correctly adapt an unformatted apple object to the correct format', () => {
			const unformattedApple = {
				id: 1,
				name: 'Golden Delicious',
				score: 5,
				appleType: 'Golden',
			};

			const expectedApple = {
				id: 1,
				name: 'Golden Delicious',
				stars: 5,
				type: 'Golden',
			};

			const adaptedApple = adaptApple(unformattedApple);

			expect(adaptedApple).toEqual(expectedApple);
		});
	});

	describe('adaptApples', () => {
		it('should correctly adapt an array of unformatted apple objects to an array of the correct format', () => {
			const unformattedApples = [
				{ id: 1, name: 'Golden Delicious', score: 5, appleType: 'Golden' },
				{ id: 2, name: 'Granny Smith', score: 3, appleType: 'Granny' },
			];

			const expectedApples = [
				{ id: 1, name: 'Golden Delicious', stars: 5, type: 'Golden' },
				{ id: 2, name: 'Granny Smith', stars: 3, type: 'Granny' },
			];

			const adaptedApples = adaptApples(unformattedApples);

			expect(adaptedApples).toEqual(expectedApples);
		});

		it('should return an empty array if no apples are provided', () => {
			const unformattedApples = [];
			const expectedApples = [];

			const adaptedApples = adaptApples(unformattedApples);

			expect(adaptedApples).toEqual(expectedApples);
		});
	});
});
