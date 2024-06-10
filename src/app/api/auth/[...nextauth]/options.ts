import { jwtDecode } from 'jwt-decode';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const route = process.env.API_URL + '/api/auth/login';
				const body = JSON.stringify({
					email: credentials!.email,
					password: credentials!.password,
				});

				try {
					const res = await fetch(route, {
						method: 'POST',
						body,
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (!res.ok) {
						const error = await res.json();
						console.error(
							`login res not ok: status ${res.status}`,
							error.message
						);
						return null;
					}

					const data = await res.json();
					const { token, players } = data;
					const { sub: email } = await jwtDecode(token);

					return {
						id: email!,
						email,
						players,
						accessToken: token,
					};
				} catch (e: any) {
					console.error(`login error: status ${e.message}`);
					return null;
				}
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
	pages: {
		signIn: '/auth/login',
	},
};
