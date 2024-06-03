import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="sticky top-[100vh]">
			<Image
				src={`/img/footer-img.svg`}
				alt="lecti"
				width={400}
				height={400}
				className="transform translate-y-1/4 mx-auto"
			/>
			<div className="bg-primary text-white py-12 pt-20 px-4 md:px-6">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="flex items-center gap-2">
						<span className="text-lg font-medium">Lecti</span>
					</div>
					<nav className="flex flex-wrap items-center gap-4 md:gap-6"></nav>
					<div className="text-sm">
						© 2024 Lecti. Todos los derechos reservados.
					</div>
				</div>
			</div>
		</footer>
	);
}
