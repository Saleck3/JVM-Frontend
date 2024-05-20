import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Apple({ params }: any) {
    //TODO Redireccionar en vez de mostrar el boton
    //Esta pagina es por las dudas, no hay pagina de manzana en si sin un ejercicio
    return (
        <main className="container py-32 md:px-12 lg:px-32 space-y-12">
            <div className="flex justify-center">
                <Link href={`/${params.player}/apple/${params.id}/1`} className="w-full">
                    <Button className="w-full">Iniciar</Button>
                </Link>
            </div>
        </main>
    )
}
