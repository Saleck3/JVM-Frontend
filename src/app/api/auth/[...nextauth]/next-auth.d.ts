import { Player } from '@/app/shared/types/user.type';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			players: Player[];
			accessToken: string;
		} & DefaultSession['user'];
	}
}
