import { useRouter } from "next/navigation"

interface cardProps{
    data: {
        id: number
        model: number
        vehicle_type: Vehicle
        brand: string
        year: string
        value: string
        price: number
        id_model: number
        id_brand: number
    }
    setUrl: (vehicle_type: Vehicle, idBrand: number, idModel: number, year: string) => void
}

export const Card = ({ data, setUrl }: cardProps) => {
    const router = useRouter()

    function navigate() {
        setUrl(data.vehicle_type, data.id_brand, data.id_model, data.year)
        router.push(`Editar/${data.id}`)
    }
    return (
        <div className="grid justify-items-center items-center lg:flex-row w-[80%] md:w-[80%] lg:w-[80%]  bg-white p-8 rounded shadow-xl">
            <img src={data.vehicle_type === 'carros' ? '../images/iconCar.png' : data.vehicle_type === 'motos' ?  '../images/iconMotorcycle.png' : '../images/iconTruck.png'} className="min-w-44 lg:min-w-[1px] flex-2 w-8 md:w-16 lg:w-32 mr-5" alt="" />
            <div className="flex-1 m-3 w-4/5">
                <p className="text-xl mb-3 border-b border-gray-500 font-medium">{data.model}</p>
                <div className="grid justify-items-start w-full">
                    <div>
                        <p>{data.vehicle_type}</p>
                        <p>Marca: {data.brand}</p>
                        <p>Ano: {data.year}</p>
                    </div>
                    <p className="place-self-start mt-2 font-semibold">R$ {data.price.toFixed(2)}</p>
                    <button onClick={navigate} className="w-2/5 mt-2 py-1 place-self-end text-lg font-semiboldshadow-md hover:shadow-lg border border-slate-400 shadow-lg rounded-lg bg-teal-600">Ver</button>
                </div>
            </div>
        </div>
    )
}