

const cookies = jest.fn(() => ({
	get: jest.fn().mockReturnValue({
		value: JSON.stringify(mockCookies)
	}),
}));

const mockCookies = {
	players: [
		{
			id: "1",
			playerName: "test",
			alias: "test",
			birthDate: "",
			totalCrowns: 3,
			spentCrowns: 0,
			recommendedModule: 1,
		},
	],
	token: 'mock-token',
	email: 'mail@lecti.com',
	currentPlayer: {
		id: "1",
		playerName: "test",
		alias: "test",
		birthDate: "",
		totalCrowns: 3,
		spentCrowns: 0,
		recommendedModule: 1,
	},
}

export { cookies, mockCookies };