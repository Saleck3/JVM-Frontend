export type User = {
	id?: string;
	name?: string;
	email?: string;
	players: Player[];
};

export type Player = {
	id: string;
	playerName: string;
	alias: string;
	birthDate: string;
	totalCrowns: number;
	spentCrowns: number;
	recommendedModule: number;
};
