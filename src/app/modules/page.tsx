import Footer from '../shared/components/Footer/Footer';
import Navbar from '../shared/components/Navbar/Navbar';
import ModuleCard from './ModuleCard';
import modulesList from './modulesList';

//TRAER DEL CONTEXTO DE USUARIO
const recomendedModule = 'intermediate';

export default function Modules() {
	return (
		<>
			<Navbar />
			<main className="w-full py-12 md:py-24 lg:py-32">
				<div className="container grid gap-6 px-4 md:px-6">
					<div className="flex flex-col items-center text-center mb-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky">
							Selección de Módulo
						</h2>
						<p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
							fugit sunt itaque a voluptate voluptatum.
						</p>
					</div>
					<div className="flex gap-y-8 justify-around flex-wrap">
						{modulesList.map((module) => (
							<ModuleCard
								key={module.slug}
								{...module}
								recommended={recomendedModule === module.slug}
							/>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
