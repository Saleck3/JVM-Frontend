import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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
		<html lang="en" className="scroll-smooth">
			<body className={font.className}>{children}</body>
		</html>
	);
}
