
export default async function Apple({ params }: any) {
    switch (params.id) {
        case "1":
            switch (params.id) {
                case "1":
                    return (
                        <div>
                            <h1>Manzana {params.id}</h1>
                            <h1>Ejercicio {params.exerciseId}</h1>
                        </div>
                    )
            }
        case "2":
            return (
                <div>
                    <h1>Manzana {params.id}</h1>
                    <h1>Ejercicio {params.exerciseId}</h1>
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
