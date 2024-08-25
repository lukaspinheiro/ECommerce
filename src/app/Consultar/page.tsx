'use client'

import { FipeApi } from "@/api/FipeApi"
import Navbar from "@/components/Navbar"
import axios from "axios"
import { log } from "console"
import { useEffect, useRef, useState } from "react"


export default function Consultar() {
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

    

    const onChangeRadio = (id:string)=>{
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
        try{
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codigo}/anos`)
            setYear(res.data)
            setCodModel(codigo)
        }
        catch(err){
            console.log(err);
        }
    }

    const onChangeYear = async (codigo: any)  =>{
        try{
            const res = await FipeApi.get(`${vehicle}/marcas/${codBrand}/modelos/${codModel}/anos/${codigo}`)
            console.log(res.data)
            setFuel(res.data.Combustivel)
            setCodRef(res.data.MesReferencia)
            setFipePrice(res.data.Valor)
            setcodFipe(res.data.CodigoFipe)

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if (vehicle!==""){
            fetchBrand()
        }
    }, [vehicle])

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300 m-0">    
            <Navbar/>
            <div className="flex flex-col bg-white p-8 rounded-lg">
                <div className="flex justify-around gap-8 bg-white p-8 rounded-lg">
                    <ul className="flex flex-row gap-x-9 bg-whiterounded-lg">
                        
                        <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="radioVehicle" id="carros" onChange={(e)=>onChangeRadio("carros")}/>
                            <label htmlFor="radio-car" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="radioVehicle" id="motos" onChange={(e)=>onChangeRadio("motos")}/>
                            <label htmlFor="radio-motorcycle" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="radioVehicle" id="caminhoes" onChange={(e)=>onChangeRadio("caminhoes")}/>
                            <label htmlFor="radio-truck" className="shadow-md hover:shadow-lg">
                                <img src="../images/iconTruck.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-row gap-8 bg-white pb-6 rounded-lg">
                    <div className="flex flex-col gap-2 bg-white pl-8">
                        <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg">
                            <label htmlFor="selectMarca">Marca</label>
                            <select id="selectMarca" onChange={(e) => onChangeBrand(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
                                <option>Selecione uma Opção</option>
                                {
                                    brand.map((b, i) => (
                                        <option key={i} value={b.codigo}>{b.nome}</option>
                                    ))
                                }
                            </select>  
                        </div>  
                        <label htmlFor="inputFuel">Combustível</label>
                        <input type="text" disabled value={fuel} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputFuel" />
                    </div>

                    <div className="flex flex-col gap-2 bg-white">
                        <div className="flex flex-col gap-2 bg-white pb-6 rounded-lg ">
                            <label htmlFor="selectModelo">Modelo</label>
                            <select id="selectModelo" onChange={(e) => onChangeModel(e.target.value)} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg">
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
                                <input type="text" disabled value={codRef} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputFipeRef" />
                            </div>

                            <div className="flex flex-col gap-2 bg-white">
                                <label htmlFor="inputFipeCod">Cód. FIPE</label>
                                <input type="text" disabled value={codFipe} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg" id="inputFipeCod" />
                            </div>
                        </div>
                    </div>
                    

                    <div className="flex flex-col gap-2 bg-white pr-8">
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
                        <label htmlFor="inputValor">Valor FIPE - R$</label>
                        <input type="text" disabled value={FipePrice} className="shadow-md hover:shadow-lg border border-slate-400 p-2 rounded-lg mb-4" id="inputCombustivel" />
                        <button onClick={fetchBrand} className="py-2 mt-4 font-bold text-lg text-white border border-slate-400 shadow-md hover:shadow-lg rounded-lg bg-teal-600">Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}