import { jwtDecode } from 'jwt-decode';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const mockLogin = async (credentials: any) => {
	return {
		players: [
			{
				id: 1,
				playerName: 'lucas',
				alias: 'Luqi',
				birthDate: '2020-05-05T15:30:00.000+00:00',
				totalCrowns: 10,
				spentCrowns: 5,
				recommendedModule: 1,
			},
			{
				id: 1,
				playerName: 'Maria Belen',
				alias: 'Maribel',
				birthDate: '2020-05-05T15:30:00.000+00:00',
				totalCrowns: 12,
				spentCrowns: 6,
				recommendedModule: 2,
			},
		],
		token:
			'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MjIyQGdtYWlsLmNvbSIsImV4cCI6MTcxNTY0ODQyOX0.xP3A2zqewS94FcmeQCLQ5h6vB7_dcYej20FYijIUNPc',
	};
};

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { token, players } = await mockLogin(credentials);
				const { sub: email } = await jwtDecode(token);

				return {
					id: email!,
					email,
					players,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }: any) {
			session.user = token.user;
			return session;
		},
		async redirect({ url }: any) {
			return url === '/logout' ? '/' : '/players';
		},
	},
};
