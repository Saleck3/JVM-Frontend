import ChooseWord from "./games/chooseword"
import WriteWord from "./games/writeword"
import DropSyllable from "./games/dropSyllable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image";

export default function Apple({ params }: any) {
    let nextModule = parseInt(params.id) + 1
    const urlRedirect = `/${params.player}/modules/${nextModule}/`;
    switch (params.id) {
        case "1"://Manzana
            switch (params.exerciseId) {
                case "1"://Ejercicio
                    return (
                        <ChooseWord
                            words={['ARGENTINA', 'AJO', 'ABRAZO', 'ALMA']}
                            correctWord={"AJO"}
                            image={'/img/games/ajo.jpg'}
                            params={params}
                        />
                    )
                case "2"://Ejercicio
                    return (
                        <WriteWord
                            correctWord={"ABEJA"}
                            preRenderLetters={['B', 'E', 'J']}
                            params={params}
                            image={'/img/games/abeja.webp'}
                        />
                    )
                case "3"://Ejercicio
                    return (
                        <DropSyllable
                            syllables={['BOL', 'AR']}
                            correctWord={"ARBOL"}
                            params={params}
                            image={'/img/games/arbol.jpg'} />
                    )
                default:
                    //redirect
                    return (
                        <main className="container py-32 md:px-12 lg:px-32 space-y-12">
                            <div className="flex flex-col items-center">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">¡¡Muy bien!!</h1>
                                <Image
                                    src={"/img/features/feature-effective.svg"}
                                    alt={"Img de victoria"}
                                    width="350"
                                    height="350"
                                />
                                <Link href={urlRedirect}>
                                    <Button className="mt-4 w-full" size={'lg'}>
                                        Volver a modulo
                                    </Button>
                                </Link>
                            </div>
                        </main>
                    )
            }
        case "2"://Manzana
            switch (params.exerciseId) {
                case "1"://Ejercicio
                    return (
                        <ChooseWord
                            words={['ESTRELLA', 'ESPEJO', 'ELEFANTE', 'ERIZO']}
                            correctWord={"ESTRELLA"}
                            image={'/img/games/estrella.jpg'}
                            params={params}
                        />
                    )
                case "2"://Ejercicio
                    return (
                        <WriteWord
                            correctWord={"ELEFANTE"}
                            preRenderLetters={['L', 'F', 'N', 'T']}
                            params={params}
                            image={'/img/games/elefante.webp'}
                        />
                    )
                case "3"://Ejercicio
                    return (
                        <DropSyllable
                            syllables={['JO', 'ES', 'PE']}
                            correctWord={"ESPEJO"}
                            params={params}
                            image={'/img/games/espejo.jpg'}
                        />
                    )
                default:
                    //redirect
                    return (
                        <main className="container py-32 md:px-12 lg:px-32 space-y-12">
                            <div className="flex flex-col items-center">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">¡¡Muy bien!!</h1>
                                <Image
                                    src={"/img/features/feature-fun.svg"}
                                    alt={"Img de victoria"}
                                    width="350"
                                    height="350"
                                />
                                <Link href={urlRedirect}>
                                    <Button className="mt-4 w-full" size={'lg'}>
                                        Volver a modulo
                                    </Button>
                                </Link>
                            </div>
                        </main>
                    )
            }
        case "3"://Manzana
            switch (params.exerciseId) {
                case "1"://Ejercicio
                    return (
                        <ChooseWord
                            words={['IMAN', 'IMPERMEABLE', 'IGLESIA', 'ISLA']}
                            correctWord={"ISLA"}
                            image={'/img/games/isla.png'}
                            params={params}
                        />
                    )
                case "2"://Ejercicio
                    return (
                        <WriteWord
                            correctWord={"IMAN"}
                            preRenderLetters={['M', 'N']}
                            params={params}
                            image={'/img/games/iman.png'}
                        />
                    )
                case "3"://Ejercicio
                    return (
                        <DropSyllable
                            syllables={['NA', 'I', 'GUA']}
                            correctWord={"IGUANA"}
                            params={params}
                            image={'/img/games/iguana.png'}
                        />
                    )
                default:
                    //redirect
                    return (
                        <main className="container py-32 md:px-12 lg:px-32 space-y-12">
                            <div className="flex flex-col items-center">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">¡¡Muy bien!!</h1>
                                <Image
                                    src={"/img/features/feature-modern.svg"}
                                    alt={"Img de victoria"}
                                    width="350"
                                    height="350"
                                />
                                <Link href={urlRedirect}>
                                    <Button className="mt-4 w-full" size={'lg'}>
                                        Volver a modulo
                                    </Button>
                                </Link>
                            </div>
                        </main>
                    )
            }
        default://Manzana
            return (
                <main className="container py-32 md:px-12 lg:px-32 space-y-12">
                    <div className="flex justify-center">
                        <Link href={`/${params.player}/modules/4/`}>
                            <Button className="mt-4 w-full" size={'lg'}>
                                Volver a modulo
                            </Button>
                        </Link>
                    </div>
                </main>
            )
    }
}
