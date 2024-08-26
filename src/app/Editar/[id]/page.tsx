'use client'

import { CrudApi } from "@/api/CrudApi"
import { FipeApi } from "@/api/FipeApi"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface IPut {
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

interface IVehicle {
    id?: number
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

type Props = {
    params: { id: string }
}

export default function Editar({ params }: Props) {
    const router = useRouter()
    const idVehiclie = params.id

    const [brand, setBrand] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])
    const [year, setYear] = useState<any[]>([])

    const [fuel, setFuel] = useState<string>("")
    const [codRef, setCodRef] = useState<string>("")
    const [codFipe, setcodFipe] = useState<string>("")
    const [FipePrice, setFipePrice] = useState<string>("")

    const [newVehicle, setNewVehicle] = useState<IVehicle>({
        vehicle_type: '',
        id_model: 0,
        model: '',
        id_brand: 0,
        brand: '',
        year: '',
        price: 0,
        notes: '',
        km: 0,
        color: '',
    })

    const [vehicleBD, setVehicleBD] = useState<IVehicle>({
        vehicle_type: '',
        id_model: 0,
        model: '',
        id_brand: 0,
        brand: '',
        year: '',
        price: 0,
        notes: '',
        km: 0,
        color: '',
    })

    //const { statusPage } = router.push();
    const [statusEditButton, setStatusEditButton] = useState<number>(0);

    function clearInputs() {
        setFuel("")
        setCodRef("")
        setcodFipe("")
        setFipePrice("")
    }

    async function deleteVehicle() {
        try {
            CrudApi.delete(`/vehicle/${idVehiclie}`)
            alert('Veiculo apagado com sucesso')
            router.replace('/')
        }
        catch (err) {
            console.log(err);
            alert('Falha ao apagar veiculo')
        }
    }

    //troca entre Editar e Cadastro
    const editButton = async () => {
        if (statusEditButton == 1) {
            if (
                !newVehicle.price ||
                !newVehicle.notes ||
                !newVehicle.km ||
                !newVehicle.color ||
                !newVehicle.id_brand ||
                !newVehicle.id_model ||
                !newVehicle.year
            ) {
                alert("Preencha todos os campos")
                return
            }
            try {
                const res = await CrudApi.put(`/vehicle/${idVehiclie}`, newVehicle)
                console.log(res);
                alert('Veiculo atualizado com sucesso!')
                setStatusEditButton(0)
            } catch (err) {
                alert('Erro ao salvar alterações')
                console.log(err);

            }
            return
        }
        if (statusEditButton == 0) {
            setNewVehicle(vehicleBD)
            setStatusEditButton(1)
            return
        }
    }

    async function back() {
        if (statusEditButton == 0) {
            router.back()
        }
        if (statusEditButton == 1) {
            const res = await FipeApi.get(`${vehicleBD.vehicle_type}/marcas/${vehicleBD.id_brand}/modelos/${vehicleBD.id_model}/anos/${vehicleBD.year}`)
            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)
            setStatusEditButton(0)
        }
    }

    const onChangeRadio = async (type: string) => {
        clearInputs()      

        if (!type) return

        try {
            setNewVehicle(obj => ({
                ...obj,
                vehicle_type: type,
                id_model: 0,
                model: '',
                id_brand: 0,
                brand: '',
                year: ''
            }))
            const res = await FipeApi.get(`${type}/marcas`)
            setBrand(res.data)

            setModels([])
            setYear([])
        }
        catch (err) {
            console.log(err);
        }
    }

    const onChangeBrand = async (codigo: any) => {
        //limpa os campos        
        clearInputs()
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
            setNewVehicle(obj => ({
                ...obj,
                id_brand: aux.codigo,
                brand: aux.name,
                id_model: 0,
                model: '',
                year: ''
            }))
            //requisição
            const res = await FipeApi.get(`${newVehicle.vehicle_type}/marcas/${aux.codigo}/modelos`)
            setModels(res.data.modelos)
        }
        catch (err) {
            console.log(err);
        }
    }

    //Mudança do campo Modelo
    const onChangeModel = async (codigo: any) => {
        //limpa os campos        
        clearInputs()
        //evitou a requisição vazia
        if (!codigo.length) {
            //verifica se Modelo está vazio (Evita requisição vazia)
            //setou Ano em 0
            return
        }
        try {
            setNewVehicle(obj => ({
                ...obj,
                id_model: aux.codigo,
                model: aux.name,
                year: ''
            }))
            const aux = JSON.parse(codigo)
            //requisição
            const res = await FipeApi.get(`${newVehicle.vehicle_type}/marcas/${newVehicle.id_brand}/modelos/${aux.codigo}/anos`)
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
            setNewVehicle(obj => ({ ...obj, year: codigo }))
            //requisição
            const res = await FipeApi.get(`${newVehicle.vehicle_type}/marcas/${newVehicle.id_brand}/modelos/${newVehicle.id_model}/anos/${codigo}`)
            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function resetForm() {
        try {
            const res = await CrudApi.get(`/vehicle/${idVehiclie}`)
            setNewVehicle(res.data)
            setVehicleBD(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        resetForm()
    }, [])

    useEffect(() => {
        if (!vehicleBD || statusEditButton === 1) return
        onChangeRadio(vehicleBD.vehicle_type)
    }, [vehicleBD!.vehicle_type])

    useEffect(() => {
        if (!vehicleBD || statusEditButton === 1) return
        onChangeBrand({ codigo: vehicleBD.id_brand, name: vehicleBD.brand })
    }, [vehicleBD!.id_brand])

    useEffect(() => {
        if (!vehicleBD || statusEditButton === 1) return
        onChangeModel({ codigo: vehicleBD.id_model, name: vehicleBD.model })
    }, [vehicleBD!.id_model])

    useEffect(() => {
        if (!vehicleBD || statusEditButton === 1) return
        onChangeYear(vehicleBD.year)
    }, [vehicleBD!.year])

    return (
        <>
            <div className="w-full h-screen overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
                <Navbar />
                <div className="flex flex-col bg-white p-8 rounded-lg">
                    <div className="flex justify-around gap-8 bg-white p-8 rounded-lg">
                        <ul className="flex flex-row gap-x-9 bg-whiterounded-lg">

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => {
                                    if (statusEditButton === 1) {
                                        onChangeRadio("carros")
                                    }
                                }
                                }>
                                <input disabled={statusEditButton !== 1} type="radio" name="radioVehicle" id="carros" onChange={() => { }} checked={newVehicle.vehicle_type === 'carros'} />
                                <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => {
                                    if (statusEditButton === 1) {
                                        onChangeRadio("motos")
                                    }
                                }
                                }>
                                <input disabled={statusEditButton !== 1} type="radio" name="radioVehicle" id="motos" onChange={() => { }} checked={newVehicle.vehicle_type === 'motos'} />
                                <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                    <img src="/images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                                </label>
                            </li>

                            <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2"
                                onClick={() => {
                                    if (statusEditButton === 1) {
                                        onChangeRadio("caminhoes")
                                    }
                                }
                                }>
                                <input disabled={statusEditButton !== 1} type="radio" name="radioVehicle" id="caminhoes" onChange={() => { }} checked={newVehicle.vehicle_type === 'caminhoes'} />
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
                                {
                                    statusEditButton === 0 ?
                                        <input type="text" value={vehicleBD?.brand} disabled className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" /> :
                                        <select disabled={statusEditButton !== 1} id="selectMarca" value={newVehicle?.brand} onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                            <option>{newVehicle.brand}</option>
                                            {
                                                brand.map((b, i) => (
                                                    <option key={i} value={JSON.stringify(b)}>{b.nome}</option>
                                                ))
                                            }
                                        </select>

                                }
                            </div>
                            <label htmlFor="inputFuel">Combustível</label>
                            <input type="text" disabled value={fuel} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFuel" />

                            <label htmlFor="inputComments">Observações</label>
                            <input type="text" disabled={statusEditButton !== 1} onChange={(e) => setNewVehicle(obj => ({ ...obj, notes: e.target.value }))} value={newVehicle.notes} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputComments" />

                            <button hidden={statusEditButton === 0} onClick={deleteVehicle} className="p-2 font-bold text-lg text-white hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-red-600 bg-red-600">Excluir</button>
                        </div>

                        <div className="flex flex-col gap-2 bg-white">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                                <label htmlFor="selectModelo">Modelo</label>
                                {
                                    statusEditButton === 0 ?
                                        <input type="text" disabled value={vehicleBD.model} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" /> :
                                        <select disabled={statusEditButton !== 1} id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} value={newVehicle.model} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                            <option>{newVehicle.model}</option>
                                            {
                                                models.map((b, i) => (
                                                    <option key={i} value={JSON.stringify(b)}>{b.nome}</option>
                                                ))
                                            }
                                        </select>

                                }
                            </div>
                            <div className="flex flex-row gap-8 bg-white pb-6 rounded-lg">
                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeRef">Mês de Ref.</label>
                                    <input type="text" disabled value={codRef} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeRef" />

                                    <label htmlFor="inputKm">Quilometragem</label>
                                    <input disabled={statusEditButton !== 1} type="number" onChange={(e) => setNewVehicle(obj => ({ ...obj, km: Number(e.target.value) }))} value={newVehicle.km} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputKm" />
                                </div>

                                <div className="flex flex-col gap-2 bg-white">
                                    <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                    <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputFipeCod" />

                                    <label htmlFor="inputColor">Cor</label>
                                    <input disabled={statusEditButton !== 1} type="text" onChange={(e) => setNewVehicle(obj => ({ ...obj, color: e.target.value }))} value={newVehicle.color} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputColor" />

                                    <button onClick={back} className="py-2 font-bold text-lg text-neutral-600 hover:shadow-lg shadow-md hover:shadow-lg rounded-lg border border-neutral-600 bg-white">{statusEditButton === 0 ? 'Voltar' : 'cancelar'}</button>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 bg-white pr-8 ">
                            <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                                <label htmlFor="selectAno">Ano</label>
                                {
                                    statusEditButton === 0 ?
                                        <input type="text" disabled className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" value={vehicleBD.year} /> :
                                        <select disabled={statusEditButton !== 1} name="" id="selectAno" onChange={(e) => onChangeYear(e.target.value)} value={newVehicle.year} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                            <option>{newVehicle.year}</option>
                                            {
                                                year.map((b, i) => (
                                                    <option key={i} value={b.codigo}>{b.nome}</option>
                                                ))
                                            }
                                        </select>

                                }
                            </div>
                            <label htmlFor="inputPriceFipe">Valor FIPE</label>
                            <input type="text" disabled value={FipePrice} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPriceFipe" />

                            <label htmlFor="inputPrice">Valor de Venda</label>
                            <input disabled={statusEditButton !== 1} type="number" onChange={(e) => setNewVehicle(obj => ({ ...obj, price: Number(e.target.value) }))} value={newVehicle.price} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-6" id="inputPrice" />

                            <button onClick={editButton} className="py-2 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">{statusEditButton === 0 ? 'Editar' : 'Salvar'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}