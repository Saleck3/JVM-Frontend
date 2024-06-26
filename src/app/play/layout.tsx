import Navbar from '../shared/components/Navbar/Navbar';

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className="sm:bg-gray-200 min-h-screen
			sm:bg-[url('/img/worm-bg-pattern.png')] bg-center"
		>
			<Navbar />
			{children}
		</div>
	);
}
