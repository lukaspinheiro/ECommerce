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
    id_brand: string
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
    const [codYear, setCodYear] = useState<number>()
    const [vehicle, setVehicle] = useState<string>("")
    const [fuel, setFuel] = useState<string>("")
    const [codRef, setCodRef] = useState<string>("")
    const [codFipe, setcodFipe] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [km, setKm] = useState<number>()
    const [FipePrice, setFipePrice] = useState<any[]>([])
    const [price, setPrice] = useState<number>()
    const [notes, setNotes] = useState<string>("")



    const router = useRouter();
    //const { statusPage } = router.push();
    const [statusEditButton, setStatusEditButton] = useState<number>(0);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [unlockInput, setUnlockInput] = useState(false);
    const [textEditButton, setTextEditButton] = useState("Editar");

    const editButton = () => {
        if (statusEditButton == 0) {
            setDeleteButtonVisible(true)
            setUnlockInput(true)
            setTextEditButton("Salvar")
            setStatusEditButton(1)
            console.log(statusEditButton)
        }
        if (statusEditButton == 1) {
            const obj: IPost = {
                vehicle_type: vehicle,
                id_model: codModel!,
                model: models.find(m => m.codigo === codModel),
                id_brand: codBrand!,
                brand: brand.find(m => m.codigo === codBrand),
                year: year.find(m => m.codigo === codYear),
                price: price!,
                notes: notes,
                km: km!,
                color: color
            }
            console.log("esses são os modelos "+models)
            console.log(obj)
            Post(obj)
            console.log(statusEditButton)

        }
    }

    useEffect(() => {
    }, [])

    const onChangeRadio = (id: string) => {
        setVehicle(id)
    }
    const LiOnclick = (id: string) => {
        setVehicle(id);
    };

    async function Post(obj: IPost) {
        try {
            const res = await CrudApi.post('/vehicle', obj)
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
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
            //console.log(`esse é o modelo ${stringModels}`)
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
            setCodYear(codigo)
            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)
            console.log(res)

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (vehicle !== "") {
            //fetch()
            fetchBrand()
        }
    }, [vehicle])

    return (
        <>
            <div className="w-full h-screen overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
                <Navbar />
                <div className="flex flex-col bg-white p-8 rounded-lg">
                    <div className="flex justify-around gap-8 bg-white p-8 rounded-lg">
                        <ul className="flex flex-row gap-x-9 bg-whiterounded-lg">

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"  
                                onClick={() => {
                                    if (unlockInput){
                                        LiOnclick("carros")
                                    }
                                }
                            }>
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="carros" onChange={(e) => onChangeRadio("carros")}checked={vehicle === 'carros'}/>
                                <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"  
                                onClick={() => {
                                    if (unlockInput){
                                        LiOnclick("motos")
                                    }
                                }
                            }>
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="motos" onChange={(e) => onChangeRadio("motos")}checked={vehicle === 'motos'}/>
                                <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"  
                                onClick={() => {
                                    if (unlockInput){
                                        LiOnclick("caminhoes")
                                    }
                                }
                            }>
                                <input disabled={!unlockInput} type="radio" name="radioVehicle" id="caminhoes" onChange={(e) => onChangeRadio("caminhoes")}checked={vehicle === 'caminhoes'}/>
                                <label htmlFor="radio-truck" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconTruck.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-row gap-8 bg-white rounded-lg ">
                        <div className="flex flex-col gap-2 bg-white pl-8">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectMarca">Marca</label>
                                <select disabled={!unlockInput} id="selectMarca" onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        brand.map((b, i) => (
                                            <option key={i} value={b.codigo}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <label htmlFor="inputFuel">Combustível</label>
                            <input type="text" disabled value={fuel} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFuel" />

                            <label htmlFor="inputComments">Observações</label>
                            <input type="text" disabled={!unlockInput} onChange={(e) => setNotes(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputComments" />

                            <button hidden={!deleteButtonVisible} className="p-2 font-bold text-lg text-white hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-red-600 bg-red-600">Excluir</button>
                        </div>

                        <div className="flex flex-col gap-2 bg-white">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                                <label htmlFor="selectModelo">Modelo</label>
                                <select disabled={!unlockInput} id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                                    <input type="text" disabled value={codRef} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeRef" />

                                    <label htmlFor="inputKm">Quilometragem</label>
                                    <input disabled={!unlockInput} type="number" onChange={(e) => setKm(Number(e.target.value))} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputKm" />
                                </div>

                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                    <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeCod" />

                                    <label htmlFor="inputColor">Cor</label>
                                    <input disabled={!unlockInput} type="text" onChange={(e) => setColor(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputColor" />

                                    <button className="py-2 font-bold text-lg text-neutral-600 hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-neutral-600 bg-white">Voltar</button>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 bg-white pr-8 ">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectAno">Ano</label>
                                <select disabled={!unlockInput} name="" id="selectAno" onChange={(e) => onChangeYear(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        year.map((b, i) => (
                                            <option key={i} value={b.codigo}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <label htmlFor="inputPriceFipe">Valor FIPE</label>
                            <input type="text" disabled value={FipePrice} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPriceFipe" />

                            <label htmlFor="inputPrice">Valor de Venda</label>
                            <input disabled={!unlockInput} type="number" onChange={(e) => setPrice(Number(e.target.value))} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPrice" />

                            <button onClick={editButton} className="py-2 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">{textEditButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}