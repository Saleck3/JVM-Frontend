import Image from 'next/image';
import { FaInstagramSquare, FaYoutube } from "react-icons/fa";


export default function Footer() {
	return (
		<footer className="sticky top-[100vh]">
			<Image
				src={`/img/footer-img.svg`}
				alt="lecti"
				width={400}
				height={400}
				className="absolute bottom-[100px] right-0 left-0 mx-auto"
			/>
			<div className="bg-primary text-white py-12 pt-20 px-4 md:px-6">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
					<a href='https://www.instagram.com/lecti_app_2024/' className="flex items-center gap-2" target='blank'>
						<FaInstagramSquare className='text-3xl' /><span className="text-lg font-medium">¡Seguinos en instagram!</span>
					</a>
					<a href='https://www.youtube.com/@Lecti-app' className="flex items-center gap-2" target='blank'>
						<FaYoutube className='text-3xl' /><span className="text-lg font-medium">¡Buscanos en Youtube!</span>
					</a>
					<nav className="flex flex-wrap items-center gap-4 md:gap-6"></nav>
					<div className="text-sm">
						© 2024 Lecti. Todos los derechos reservados.
					</div>
				</div>
			</div>
		</footer>
	);
}
