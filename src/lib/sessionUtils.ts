'use server';

import { LectiData, Token } from '@/app/shared/types/auth.type';
import { Player } from '@/app/shared/types/user.type';
import { cookies } from 'next/headers';


export const getLectiData = (): LectiData | undefined => {
	try {
		const lectiCookie = cookies().get('lecti-data');
		if (lectiCookie) {
			return JSON.parse(lectiCookie.value);
		}
		return undefined;
	} catch (error) {
		console.error('Failed to get lecti-data cookie:', error);
		return undefined;
	}
};

export const getPlayers = async (): Promise<Player[]> => {
	const lectiData = await getLectiData();
	return lectiData ? lectiData.players : [];
};

export const getToken = async (): Promise<Token> => {
	const lectiData = await getLectiData();
	return lectiData!.token;
};

export const getLoggedUser = async (): Promise<string | undefined> => {
	const lectiData = await getLectiData();
	return lectiData?.email;
};

export const getCurrentPlayer = async (): Promise<Player | undefined> => {
	const lectiData = await getLectiData();
	return lectiData!.currentPlayer;
};

export const createLectiData = (
	email: string,
	players: Player[],
	tokenValue: string,
	tokenExp: number
): LectiData => {
	return {
		email,
		players,
		token: {
			value: tokenValue,
			exp: tokenExp,
		},
	};
};

export const setLectiData = (data: LectiData): void => {
	cookies().set('lecti-data', JSON.stringify(data), {
		expires: new Date(data.token.exp * 1000),
		sameSite: 'strict',
		httpOnly: false,
	});
};

export const updateLectiData = async (data: Partial<LectiData>) => {
	const currentData = await getLectiData()!;
	const newData = { ...currentData, ...data };

	setLectiData(newData);
};

export const removeLectiData = () => {
	cookies().set('lecti-data', '', {
		expires: new Date(0),
		sameSite: 'strict',
		httpOnly: false,
	});
};
