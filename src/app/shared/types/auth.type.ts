import { Player } from './user.type';

export type Token = {
	value: string;
	exp: number;
};

export type LectiData = {
	email: string;
	token: Token;
	players: Player[];
	currentPlayer?: Player;
};
