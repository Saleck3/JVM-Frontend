export type User = {
	id?: string;
	name?: string;
	email?: string;
	players: Player[];
};

export type Player = {
	id: number;
	playerName: string;
	birthDate: string;
	totalCrowns: number;
	spentCrowns: number;
	recommendedModule: number;
};
