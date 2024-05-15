import { User } from '../types/user.type';

export const mockUser: User = {
	id: '1',
	name: 'john doe',
	email: 'johndoe@gmail.com',
	players: [
		{
			id: '1',
			name: 'Mark Doe',
			birthDate: '2020-01-01',
			totalCrowns: 30,
			spentCrowns: 10,
			recommendedModule: 2,
		},
		{
			id: '2',
			name: 'Jane Doe',
			birthDate: '2020-01-01',
			totalCrowns: 100,
			spentCrowns: 50,
			recommendedModule: 1,
		},
	],
};
