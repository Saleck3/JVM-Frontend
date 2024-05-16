import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/contexts/AuthProvider';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Lecti',
	description: 'Aprende lectoescritura con Lecti',
};

/* istanbul ignore next */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
