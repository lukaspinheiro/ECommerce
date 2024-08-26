'use client'

import { CrudApi } from "@/api/CrudApi"
import { FipeApi } from "@/api/FipeApi"
import Navbar from "@/components/Navbar"
import { VehicleContext } from "@/context/VehicleContext"
import { useParams, usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router';



interface IPost {
    vehicle_type: string
    id_model: string
    model: string
    id_brand: string
    brand: string
    year: string
    price: string
    notes: string
    km: string
    color: string
}

interface IVehicle {
    id: number
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

type Props={
    params:{id: string}
}

export default function Editar({params}:Props) {
    const { data: _data } = useContext(VehicleContext)


    const [brand, setBrand] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])
    const [year, setYear] = useState<any[]>([])
    const [codBrand, setCodBrand] = useState<string>()
    const [codModel, setCodModel] = useState<string>()
    const [codYear, setCodYear] = useState<string>()
    const [vehicle, setVehicle] = useState<string>("")

    const [fuel, setFuel] = useState<string>("")
    const [codRef, setCodRef] = useState<string>("")
    const [codFipe, setcodFipe] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [km, setKm] = useState<string>("")
    const [FipePrice, setFipePrice] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    
    const [vehicleBD, setVehicleBD] = useState<IVehicle>()



    //const { statusPage } = router.push();
    const [statusEditButton, setStatusEditButton] = useState<number>(0);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
    const [unlockInput, setUnlockInput] = useState(false);
    const [textEditButton, setTextEditButton] = useState("Editar");
    console.log(params.id)

    //troca entre Editar e Cadastro
    const editButton = async() => {
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
            await Post(obj)
            console.log(statusEditButton)
    
            return
        }
        if (statusEditButton == 0) {
            setDeleteButtonVisible(true)
            setUnlockInput(true)
            setTextEditButton("Salvar")
            setStatusEditButton(1)
            console.log(statusEditButton)
            return
        }
        console.log("ESSE É O CODMODEL: "+codModel)
    }

    //Limpa os Inputs
    function clearInputs(){
        setFuel("")
        setCodRef("")
        setcodFipe("")
        setFipePrice("")
        setNotes("")
        setKm("")
        setColor("")
        setPrice("")
    }

    //Mudança dos RadioButtons
    const onChangeRadio = (id:string)=>{
        setVehicle(id)
        clearInputs()
        setBrand(["Selecione uma Opção"])
        setModels(["Selecione uma Opção"])
        setYear(["Selecione uma Opção"])
        clearInputs()
    }

    async function Post(obj: IPost) {
        try {
            console.log("Entrou aquiiiiii!!!!!!!!!")
            const res = await CrudApi.post('vehicle', obj)
            
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Marca
    const onChangeBrand = async (codigo: any) => {
        console.log("CODIGOO"+codigo)
        //limpa os campos
        clearInputs()
        setModels(["Selecione uma Opção"])
        setYear(["Selecione uma Opção"])
        
        
        try {
            //verifica se Marca está vazia (Evita requisição vazia)
            if (!codigo?.includes("Selecione uma Opção")){
                console.log("não está vazio")
                
                //requisição
                const res = await FipeApi.get(`${vehicle}/marcas/${codigo}/modelos`)
                setModels(res.data.modelos)
                setCodBrand(codigo)
            }
            else{
                //evitou a requisição vazia
                //setou Modelo e Ano em 0
                setModels([0])
                setYear([0])
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Modelo
    const onChangeModel = async (codigo: any) => {
        //limpa os campos
        clearInputs()
        setYear(["Selecione uma Opção"])
        
        try{
            //verifica se Modelo está vazio (Evita requisição vazia)
            if (!codigo.includes("Selecione uma Opção")){
                console.log("não está vazio")
    
                //requisição
                const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codigo}/anos`)
                setCodModel(codigo)
                setYear(res.data)
            }
            else{
                //evitou a requisição vazia
                //setou Ano em 0
                setYear(["Selecione uma Opção"])
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //Mudança do campo Ano
    const onChangeYear = async (codigo: any)  =>{
        //limpa os campos
        clearInputs
        try{
            //verifica se Ano está vazio (Evita requisição vazia)
            if (!codigo.includes("Selecione uma Opção")){
                console.log("não está vazio")
               
                //requisição
                const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codModel}/anos/${codigo}`)

                console.log(res.data)
                setFuel(res.data.Combustivel)
                setCodRef(res.data.MesReferencia)
                setFipePrice(res.data.Valor)
                setcodFipe(res.data.CodigoFipe)
                setCodYear(codigo)
            }

        }
        catch(err){
            console.log(err);
        }
    }  

    useEffect(() => {
        const fetch = async () => {
            // AQUIIIIIIIIIIII
            try {
                const result = await CrudApi.get(`vehicle/${params.id}`)
                console.log(result)
    
                setVehicleBD(result.data)
                setVehicle(result.data.vehicle_type === 'carros' ? "carros" : result.data.vehicle_type === 'motos' ? "motos" : "caminhoes")
                setCodBrand(result.data.id_brand)
                setNotes(result.data.notes)
                setKm(result.data.km)
                setColor(result.data.color)
                setPrice(result.data.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
                // setBrand(result.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch()
    }, [params.id]);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await FipeApi.get(`${vehicle}/marcas`)
                setBrand(res.data)
                if (vehicleBD){
                    const validOption = brand.find((option:any) => option.codigo == vehicleBD.id_brand)
                    if(validOption){
                        setCodBrand(validOption.codigo)
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        if(vehicleBD){
            fetchBrand()
        }
    }, [vehicleBD]) 

    useEffect(() => {
        const fetchModels = async () => {
            try {
                if(brand){
                    const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos`)
                    setModels(res.data.modelos)
                    console.dir(res.data.modelos)
                    if (vehicleBD){
                        const validOption = models.find((option:any) => option.codigo == vehicleBD.id_model)
                        if(validOption){
                            setCodModel(validOption.codigo)
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        if(vehicleBD){
            fetchModels()
        }
    }, [brand, vehicleBD]) 

    useEffect(() => {
        const fetchYears = async () => {
            try {
                if(models){
                    const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${vehicleBD?.id_model}/anos`)
                    setYear(res.data)
                    console.dir("YEAR"+year)
                    if (vehicleBD){
                        const validOption = year.find((option:any) => option.codigo === vehicleBD.year)
                        if(validOption){
                            setCodYear(validOption.codigo)
                            

                            const res2 = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${vehicleBD?.id_model}/anos/${vehicleBD.year}`)
                            console.log(res.data)
                            setFuel(res2.data.Combustivel)
                            setCodRef(res2.data.MesReferencia)
                            setFipePrice(res2.data.Valor)
                            setcodFipe(res2.data.CodigoFipe)
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        if(vehicleBD){
            fetchYears()
        }
    }, [models, vehicleBD]) 

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
                                        onChangeRadio("carros")
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
                                        onChangeRadio("motos")
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
                                        onChangeRadio("caminhoes")
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
                                <select disabled={!unlockInput} id="selectMarca" value={codBrand} onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                            <input type="text" disabled={!unlockInput} onChange={(e) => setNotes(e.target.value)} value={notes} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputComments" />

                            <button hidden={!deleteButtonVisible} className="p-2 font-bold text-lg text-white hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-red-600 bg-red-600">Excluir</button>
                        </div>

                        <div className="flex flex-col gap-2 bg-white">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                                <label htmlFor="selectModelo">Modelo</label>
                                <select disabled={!unlockInput} id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} value={codModel} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                                    <input disabled={!unlockInput} type="text" onChange={(e) => setKm(e.target.value)} value={km} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputKm" />
                                </div>

                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                    <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeCod" />

                                    <label htmlFor="inputColor">Cor</label>
                                    <input disabled={!unlockInput} type="text" onChange={(e) => setColor(e.target.value)} value={color} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputColor" />

                                    <button className="py-2 font-bold text-lg text-neutral-600 hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-neutral-600 bg-white">Voltar</button>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 bg-white pr-8 ">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectAno">Ano</label>
                                <select disabled={!unlockInput} name="" id="selectAno" onChange={(e) => onChangeYear(e.target.value)} value={codYear} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                            <input disabled={!unlockInput} type="text" onChange={(e) => setPrice(e.target.value)} value={price} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPrice" />

                            <button onClick={editButton} className="py-2 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">{textEditButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}