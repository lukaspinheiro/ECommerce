'use client'

import { CrudApi } from "@/api/CrudApi"
import { FipeApi } from "@/api/FipeApi"
import Navbar from "@/components/Navbar"
import { VehicleContext } from "@/context/VehicleContext"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

interface IPost {
    vehicle_type: string
    id_model: number
    model: string
    id_brand: number
    brand: string
    year: string
    price: number
    notes: string
    km: number
    color: string
}

export default function Editar() {
    const { data: _data } = useContext(VehicleContext)


    const [brand, setBrand] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])
    const [year, setYear] = useState<any[]>([])
    const [codBrand, setCodBrand] = useState<string>()
    const [codModel, setCodModel] = useState<number>()
    const [vehicle, setVehicle] = useState<string>("")
    const [fuel, setFuel] = useState<string>("")
    const [codRef, setCodRef] = useState<string>("")
    const [codFipe, setcodFipe] = useState<string>("")
    const [FipePrice, setFipePrice] = useState<any[]>([])

    const router = useRouter();
    //const { statusPage } = router.push();
    const [statusEditButton, setStatusEditButton] = useState<number>(0);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [unlockInput, setUnlockInput] = useState(false);
    const [textEditButton, setTextEditButton] = useState("Editar");


    //  -> Visualizar veículo (tudo bloqueado)
    // 0 -> Editar Veículo     (Liberado)
    // 1 -> Consulta Fipe
    const editButton = () => {
        if (statusEditButton == 0) {
            setDeleteButtonVisible(true)
            setUnlockInput(true)
            setTextEditButton("Salvar")
            setStatusEditButton(1)
        }
        if (statusEditButton == 1) {
            setStatusEditButton(2)
        }
        if (statusEditButton == 2){
        }
    }

    useEffect(() => {
    }, [])

    const onChangeRadio = (id: string) => {
        setVehicle(id)
    }

    const fetchBrand = async () => {
        try {
            const res = await FipeApi.get(`${vehicle}/marcas`)
            setBrand(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function Post(obj: IPost) {
        /* 
        obj: {
            vehicle_type: string
            id_model: number
            model: string
            id_brand: number
            brand: string
            year: string
            price: number
            notes: string
            km: number
            color: string
        }
         */
        try {
            const res = await CrudApi.post('/vehicle', obj)
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetch = async () => {
        // AQUIIIIIIIIIIII
        try {
            const res = await FipeApi.get(_data.url)
            const data = res.data
            console.log(res.data);
            setFipePrice(data.Valor)
            onChangeRadio(data.TipoVeiculo === 1 ? 'carros' : data.TipoVeiculo === 2 ? 'motos' : 'caminhoes')
            onChangeBrand(_data.brand)
            onChangeModel(_data.model)
            onChangeYear(_data.year)
        }
        catch (err) {
            console.log(err);
        }
    }


    const onChangeBrand = async (codigo: any) => {
        try {
            const res = await FipeApi.get(`${vehicle}/marcas/${codigo}/modelos`)
            setModels(res.data.modelos)
            setCodBrand(codigo)
        }
        catch (err) {
            console.log(err);
        }
    }

    const onChangeModel = async (codigo: any) => {
        try {
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codigo}/anos`)
            setYear(res.data)
            setCodModel(codigo)
        }
        catch (err) {
            console.log(err);
        }
    }

    const onChangeYear = async (codigo: any) => {
        try {
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codModel}/anos/${codigo}`)
            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        if (vehicle !== "") {
            fetchBrand()
        }
    }, [vehicle])

    return (
        <>
            <div className="w-full h-screen overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300 pt-[10rem]">
                <Navbar />
                <div className="flex flex-col bg-white p-8 rounded-lg">
                    <div className="flex flex-row gap-6 bg-white p-8 rounded-lg">
                        <ul className="flex flex-col justify-between gap-2 bg-whiterounded-lg">

                            <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="carros" onChange={(e) => onChangeRadio("carros")} />
                                <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="motos" onChange={(e) => onChangeRadio("motos")} />
                                <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="caminhoes" onChange={(e) => onChangeRadio("caminhoes")} />
                                <label htmlFor="radio-truck" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconTruck.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>
                        </ul>
                        <li className="shadow-md border-2 border-slate-400 rounded-lg w-full grid justify-items-center content-center pt-2">
                            <img src="/images/iconCamera.png" className="w-8 md:w-16 lg:w-32" alt="" />
                        </li>
                    </div>

                    <div className="flex flex-row gap-8 bg-white rounded-lg ">
                        <div className="flex flex-col gap-2 bg-white pl-8">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectMarca">Marca</label>
                                <select disabled={!unlockInput} value={brand} id="selectMarca" onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        brand.map((b, i) => (
                                            <option key={i} value={b.codigo}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <label htmlFor="inputFuel">Combustível</label>
                            <input type="text" disabled value={fuel} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputFuel" />

                            <label htmlFor="inputComments">Observações</label>
                            <input type="text" disabled={!unlockInput} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputComments" />

                            <button hidden={!deleteButtonVisible} className="py-2 font-bold text-lg text-white hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-red-600 bg-red-600">Excluir</button>
                        </div>

                        <div className="flex flex-col gap-2 bg-white">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                                <label htmlFor="selectModelo">Modelo</label>
                                <select disabled={!unlockInput} id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        models.map((b, i) => (
                                            <option key={i} value={b.codigo}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex flex-row gap-8 bg-white pb-6 rounded-lg">
                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeRef">Mês de Ref.</label>
                                    <input type="text" disabled value={codRef} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputFipeRef" />

                                    <label htmlFor="inputKm">Quilometragem</label>
                                    <input disabled={!unlockInput} type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" id="inputKm" />
                                </div>

                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                    <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputFipeCod" />

                                    <label htmlFor="inputColor">Cor</label>
                                    <input disabled={!unlockInput} type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputColor" />

                                    <button className="py-2 font-bold text-lg text-neutral-600 hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-neutral-600 bg-white">Voltar</button>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 bg-white pr-8 ">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectAno">Ano</label>
                                <select disabled={!unlockInput} name="" id="selectAno" onChange={(e) => onChangeYear(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        year.map((b, i) => (
                                            <option key={i} value={b.codigo}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <label htmlFor="inputPriceFipe">Valor FIPE</label>
                            <input type="text" disabled value={FipePrice} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputPriceFipe" />

                            <label htmlFor="inputPrice">Valor de Venda</label>
                            <input disabled={!unlockInput} type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg mb-6" id="inputPrice" />

                            <button onClick={editButton} className="py-2 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">{textEditButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}