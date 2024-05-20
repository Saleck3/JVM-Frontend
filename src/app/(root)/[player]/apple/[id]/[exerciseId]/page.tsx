import ChooseWord from "./games/chooseword"
import WriteWord from "./games/writeword"
import DropSyllable from "./games/dropSyllable"

export default function Apple({ params }: any) {
    switch (params.id) {
        case "1":
            switch (params.exerciseId) {
                case "1":
                    return (
                        <div>
                            <ChooseWord
                                words={['ARGENTINA', 'AJO', 'ABRAZO', 'ALMA']}
                                correctWord={"AJO"}
                                image={'/img/games/ajo.jpg'}
                                params={params}
                            />

                        </div>
                    )
                case "2":
                    return (
                        <div>
                            <WriteWord
                                correctWord={"leon"}
                                params={params}
                                image={'/img/games/lion.svg'}
                            />
                        </div>
                    )
                case "3":
                    return (
                        <DropSyllable
                            syllables={['le', 'ón']}
                            correctWord={"león"}
                            params={params}
                            image={'/img/games/lion.svg'}
                        />
                    )
                default:

            }
        case "2":
            return (
                <div>
                    <WriteWord
                        correctWord={"leonidas"}
                        params={params}
                        image={'/img/games/lion.svg'}
                    />
                </div>
            )
        case "3":
            return (
                <div>
                    <h1>Manzana {params.id}</h1>
                    <h1>Ejercicio {params.exerciseId}</h1>
                </div>
            )
        default:
            return (
                <div>
                    <h1>Default</h1>
                    <h1>Manzana {params.id}</h1>
                    <h1>Ejercicio {params.exerciseId}</h1>
                </div>
            )
    }
}
