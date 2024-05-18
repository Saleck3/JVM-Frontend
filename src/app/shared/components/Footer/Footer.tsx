import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="sticky top-[100vh]">
			<Image
				src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/footer-img.svg`}
				alt="lecti"
				width={400}
				height={400}
				className="transform translate-y-1/4 mx-auto"
			/>
			<div className="bg-primary text-white py-12 pt-20 px-4 md:px-6">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="flex items-center gap-2">
						<span className="text-lg font-medium">Lecti 🪱</span>
					</div>
					<nav className="flex flex-wrap items-center gap-4 md:gap-6">
						<Link className="hover:text-gray-200 transition-colors" href="#">
							Necesito
						</Link>
						<Link className="hover:text-gray-200 transition-colors" href="#">
							AlgoPara
						</Link>
						<Link className="hover:text-gray-200 transition-colors" href="#">
							Acá
						</Link>
					</nav>
					<div className="text-sm">
						© 2024 Lecti. Todos los derechos reservados.
					</div>
				</div>
			</div>
		</footer>
	);
}
