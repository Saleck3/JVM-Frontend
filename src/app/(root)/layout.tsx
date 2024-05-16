import Footer from '../shared/components/Footer/Footer';
import Navbar from '../shared/components/Navbar/Navbar';

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
