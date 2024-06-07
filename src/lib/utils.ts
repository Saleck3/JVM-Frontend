import { options } from '@/app/api/auth/[...nextauth]/options';
import { Player } from '@/app/shared/types/user.type';
import { type ClassValue, clsx } from 'clsx';
import { getServerSession } from 'next-auth';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getPlayerByAliasSsr = async (
	alias: string
): Promise<Player | undefined> => {
	const session = await getServerSession(options);
	return session?.user.players.find((player) => player.alias === alias);
};
