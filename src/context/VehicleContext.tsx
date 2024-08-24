'use client'

import { createContext, ReactNode, useState } from "react"


interface IVehicleContext {
    data: {
        url: string
        brand: number
        model: number
        year: string
    }
    setUrl: (vehicleType: Vehicle, idBrand: number, idModel: number, year: string) => void
}

export const VehicleContext = createContext<IVehicleContext>({} as IVehicleContext)

interface VehicleProviderProps {
    children: ReactNode
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({children}) => {
    const [url, set] = useState<string>('')
    const [brand, setBrand] = useState<number>(0)
    const [model, setModel] = useState<number>(0)
    const [year, setYear] = useState<string>('')

    const setUrl = (vehicleType: Vehicle, idBrand: number, idModel: number, year: string) => {
        setBrand(idBrand)
        setModel(idModel)
        setYear(year)
        set(`${vehicleType}/marcas/${idBrand}/modelos/${idModel}/anos/${year}`)
    }

    return (
        <VehicleContext.Provider value={{data: {url, brand, model, year}, setUrl}}>
            {children}
        </VehicleContext.Provider>
    )
}