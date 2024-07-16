'use client'

import { FipeApi } from "@/api/FipeApi"
import { useEffect, useState } from "react"


export default function Home() {
    const [brand, setBrand] = useState<any[]>([])
    const [models, setModels] = useState<any[]>([])

    const fetchBrand = async () => {
        try {
            const res = await FipeApi.get('carros/marcas')
            setBrand(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const onChangeBrand = async (codigo: any) => {
        try {
            const res = await FipeApi.get(`carros/marcas/${codigo}/modelos`)
            console.log(res);
            setModels(res.data.modelos)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBrand()
    }, [])

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
            <div className="flex flex-col bg-white p-8 rounded-lg ">
                <div className="flex flex-row gap-6 bg-white p-8 rounded-lg">
                    <ul className="flex flex-col justify-between gap-2 bg-whiterounded-lg">
                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-car" />
                            <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-motorcycle" />
                            <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-truck" />
                            <label htmlFor="radio-truck" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconTruck.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>
                    </ul>
                    <li className="shadow-md border-2 border-slate-400 rounded-lg w-full grid justify-items-center content-center pt-2">
                        <img src="../images/iconCamera.png" className="w-8 md:w-16 lg:w-32" alt="" />
                    </li>
                </div>

                <div className="flex flex-col gap-2 bg-white px-8 pb-6 rounded-lg">
                    <label htmlFor="selectMarca">Marca</label>
                    <select id="selectMarca" onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">
                        <option>Selecione uma Opção</option>
                        {
                            brand.map((b, i) => (
                                <option key={i} value={b.codigo}>{b.nome}</option>
                            ))
                        }
                    </select>

                    <label htmlFor="selectModelo">Modelo</label>
                    <select id="selectModelo" onChange={(e) => console.log(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">
                        <option>Selecione uma Opção</option>
                        {
                            models.map((b, i) => (
                                <option key={i} value={b.codigo}>{b.nome}</option>
                            ))
                        }
                    </select>

                    <label htmlFor="selectAno">Ano</label>
                    <select name="" id="selectAno" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg"></select>
                </div>

                <div className="flex flex-row gap-8 bg-white pb-6 rounded-lg">
                    <div className="flex flex-col gap-2 bg-white pl-8">
                        <label htmlFor="inputCombustivel">Combustível</label>
                        <input type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" id="inputCombustivel" />
                    </div>

                    <div className="flex flex-col gap-2 bg-white">
                        <label htmlFor="inputFipeRef">Mês de Ref.</label>
                        <input type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" id="inputFipeRef" />
                    </div>

                    <div className="flex flex-col gap-2 bg-white">
                        <label htmlFor="inputFipeCod">Cód. FIPE</label>
                        <input type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" id="inputFipeCod" />
                    </div>

                    <div className="flex flex-col gap-2 bg-white pr-8">
                        <label htmlFor="inputValor">Valor FIPE - R$</label>
                        <input type="text" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" id="inputCombustivel" />
                        <button onClick={fetchBrand} className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg">Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}