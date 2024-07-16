interface cardProps{
    model: string
    vehicle: number
    brand: string
    year: number
    value: string
}

export const Card = ({model, vehicle, brand, year, value}: cardProps) => {
    return (
        <div className="flex justify-start flex-col items-center lg:flex-row w-[90%] md:w-[50%] lg:w-[25%] border-t bg-white p-5 rounded">
            <img src="../images/iconCar.png" className="min-w-44 lg:min-w-[1px] flex-2 w-8 md:w-16 lg:w-32 mr-5" alt="" />
            <div className="flex-1 m-3">
                <p className="text-xl mb-3 border-b border-gray-500 font-medium">{model}</p>
                <div className="flex justify-start w-full">
                    <div>
                        <p>{vehicle === 1 ? 'Carro' : vehicle === 2 ? 'Moto' : 'Caminhão'}</p>
                        <p>Marca: {brand}</p>
                        <p>Ano: {year}</p>
                    </div>
                    <p className="self-end ml-16 font-semibold">{value}</p>
                </div>
            </div>
        </div>
    )
}