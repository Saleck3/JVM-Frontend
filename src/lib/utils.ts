import { options } from '@/app/api/auth/[...nextauth]/options';
import { ParsedFormData } from '@/app/shared/types/form.type';
import { Player } from '@/app/shared/types/user.type';
import { type ClassValue, clsx } from 'clsx';
import { getServerSession } from 'next-auth';
import { twMerge } from 'tailwind-merge';
import { ZodObject } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getSsrUtils = async () => {
	const session = await getServerSession(options);

	const getPlayers = () => {
		return session!.user.players;
	};

	const getPlayerByAliasSsr = (alias: string): Player | undefined => {
		return session!.user.players.find((player) => player.alias === alias);
	};

	const getAccessTokenSsr = () => {
		return session!.user.accessToken;
	};

	return {
		getPlayerByAliasSsr,
		getAccessTokenSsr,
		getPlayers,
	};
};

export const parseFormData = (
	formData: FormData,
	schema: ZodObject<any>
): ParsedFormData | any => {
	const data = Object.fromEntries(formData.entries());
	const parsedData = schema.safeParse(data);

	if (parsedData.error) {
		return {
			fieldValues: data,
			fieldErrors: parsedData.error.flatten().fieldErrors,
		};
	}

	return { fieldValues: parsedData.data };
};
