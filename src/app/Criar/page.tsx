'use client'

import { CrudApi } from "@/api/CrudApi"
import { FipeApi } from "@/api/FipeApi"
import Navbar from "@/components/Navbar"
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

export default function Criar() {
    const [brand, setBrand] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])
    const [year, setYear] = useState<any[]>([])
    const [codBrand, setCodBrand] = useState<{codigo: string, nome: string}>()
    const [codModel, setCodModel] = useState<{codigo: number, nome: string}>()
    const [codYear, setCodYear] = useState<string>("")
    const [vehicle, setVehicle] = useState<string>("")

    const [fuel, setFuel] = useState<string>("")
    const [codRef, setCodRef] = useState<string>("")
    const [codFipe, setcodFipe] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [km, setKm] = useState<string>("")
    const [FipePrice, setFipePrice] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [notes, setNotes] = useState<string>("")

    const router = useRouter()

    //Limpa os Inputs
    function clearInputs() {
        setFuel("")
        setCodRef("")
        setcodFipe("")
        setFipePrice("")
        setNotes("")
        setColor("")
    }

    //Mudança dos RadioButtons
    const onChangeRadio = (type: string) => {
        setVehicle(type)
        clearInputs()
        fetchBrand(type)
        setBrand([])
        setModels([])
        setYear([])
        clearInputs()
    }

    async function Post(obj: IPost) {
        try {
            const res = await CrudApi.post('vehicle', obj)
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchBrand = async (type: string) => {
        try {
            const res = await FipeApi.get(`${type}/marcas`)
            setBrand(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Marca
    const onChangeBrand = async (codigo: any) => {
        //limpa os campos
        clearInputs()
        setModels([])
        setYear([])

        //verifica se Marca está vazia (Evita requisição vazia)
        if (!codigo.length) {
            //evitou a requisição vazia
            //setou Modelo e Ano em 0
            setModels([])
            setYear([])
            return
        }
        try {
            const aux = JSON.parse(codigo)
            //requisição
            const res = await FipeApi.get(`${vehicle}/marcas/${aux.codigo}/modelos`)
            console.log(res.data.modelos);
            
            setModels(res.data.modelos)
            setCodBrand(aux)
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Modelo
    const onChangeModel = async (codigo: any) => {
        //limpa os campos
        clearInputs()
        setYear([])

        //evitou a requisição vazia
        if (!codigo.length) {
            //verifica se Modelo está vazio (Evita requisição vazia)
            //setou Ano em 0
            setYear([])
            return
        }

        try {
            const aux = JSON.parse(codigo)
            //requisição
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand?.codigo}/modelos/${aux.codigo}/anos`)
            setCodModel(aux)
            setYear(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Ano
    const onChangeYear = async (codigo: string) => {

        //limpa os campos
        clearInputs()
        
        //verifica se Ano está vazio (Evita requisição vazia)
        if (!codigo.length) return

        try {
            
            //requisição
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand?.codigo}/modelos/${codModel?.codigo}/anos/${codigo}`)

            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)
            setCodYear(codigo)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function submit() {
        if(!codModel || !codBrand || !codYear || !price || !notes || !km || !color) {
            alert("Preencha todos os campos")
            return
        }
        if(isNaN(Number(price)) || isNaN(Number(km))) {
            alert("Campos invalidos!")
            return
        }
        
        try {
            const obj: IPost = {
                vehicle_type: vehicle,
                id_model: codModel.codigo,
                model: codModel.nome,
                id_brand: parseInt(codBrand.codigo),
                brand: codBrand.nome,
                year: codYear,
                price: Number(price),
                notes: notes,
                km: Number(km),
                color: color,
            }

            const res = await CrudApi.post('/vehicle', obj)
            router.replace('/')
        }
        catch(err) {
            alert("Erro ao cadastrar veiculo")
            console.log("error: ", err);
        }
    }

    return (
        <>
            <div className="w-full h-screen overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
                <Navbar />
                <div className="flex flex-col bg-white p-8 rounded-lg">
                    <div className="flex justify-around gap-8 bg-white p-8 rounded-lg">
                        <ul className="flex flex-row gap-x-9 bg-whiterounded-lg">

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => onChangeRadio("carros")}>
                                <input type="radio" name="radioVehicle" id="carros" onChange={() => { }} checked={vehicle === 'carros'} />
                                <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => onChangeRadio("motos")}>
                                <input type="radio" name="radioVehicle" id="motos" onChange={() => { }} checked={vehicle === 'motos'} />
                                <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => onChangeRadio("caminhoes")}>
                                <input type="radio" name="radioVehicle" id="caminhoes" onChange={() => { }} checked={vehicle === 'caminhoes'} />
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
                                <select id="selectMarca" onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        brand.map((b, i) => (
                                            <option key={i} value={JSON.stringify(b)}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <label htmlFor="inputFuel">Combustível</label>
                            <input type="text" disabled value={fuel} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFuel" />

                            <label htmlFor="inputComments">Observações</label>
                            <input type="text" onChange={(e) => setNotes(e.target.value)} value={notes} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputComments" />

                            <button className="py-2 font-bold text-lg text-neutral-600 hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-neutral-600 bg-white">Voltar</button>
                        </div>

                        <div className="flex flex-col gap-2 bg-white">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                                <label htmlFor="selectModelo">Modelo</label>
                                <select id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                    <option>Selecione uma Opção</option>
                                    {
                                        models.map((b, i) => (
                                            <option key={i} value={JSON.stringify(b)}>{b.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex flex-row gap-8 bg-white pb-6 rounded-lg">
                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeRef">Mês de Ref.</label>
                                    <input type="text" disabled value={codRef} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeRef" />

                                    <label htmlFor="inputKm">Quilometragem</label>
                                    <input type="number" onChange={(e) => setKm(e.target.value)} value={km} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputKm" />
                                </div>

                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                    <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeCod" />

                                    <label htmlFor="inputColor">Cor</label>
                                    <input type="text" onChange={(e) => setColor(e.target.value)} value={color} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputColor" />
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 bg-white pr-8 ">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectAno">Ano</label>
                                <select name="" id="selectAno" onChange={(e) => onChangeYear(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPrice" />

                            <button onClick={submit} className="py-2 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}