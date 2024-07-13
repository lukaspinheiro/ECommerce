'use client'


export default function Home(){

    return(
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
            <div className="flex flex-col bg-white p-8 rounded-lg">
                <div className="flex flex-row gap-6 bg-white p-8 rounded-lg">
                    <ul className="flex flex-col justify-between gap-3 bg-whiterounded-lg">
                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-car"/>
                            <label htmlFor="radio-car">
                                <img src="../images/iconCar.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-motorcycle" />
                            <label htmlFor="radio-motorcycle">
                                <img src="../images/iconMotorcycle.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>

                        <li className="shadow-md border-2 border-slate-400 rounded-lg grid justify-items-center pt-2">
                            <input type="radio" name="" id="radio-truck" />
                            <label htmlFor="radio-truck">
                                <img src="../images/iconTruck.png" className="w-8 md:w-16 lg:w-32" alt="" />
                            </label>
                        </li>
                    </ul>
                    <li className="shadow-md border-2 border-slate-400 rounded-lg w-full grid justify-items-center content-center pt-2">
                        <img src="../images/iconCamera.png" className="w-8 md:w-16 lg:w-32" alt="" />
                    </li>
                </div>

                <div className="flex flex-col gap-3 bg-white px-8 pb-8 rounded-lg">
                    <label htmlFor="selectMarca">Marca</label>
                    <select name="" id="selectMarca" className="shadow border border-slate-400 py-2 rounded-lg"></select>

                    <label htmlFor="selectModelo">Modelo</label>
                    <select name="" id="selectModelo" className="shadow border border-slate-400 py-2 rounded-lg"></select>

                    <label htmlFor="selectAno">Ano</label>
                    <select name="" id="selectAno" className="shadow border border-slate-400 py-2 rounded-lg"></select>
                </div>

                <div className="flex flex-row bg-white gap-8 pb-8">
                    <div className="flex flex-col gap-3 bg-white pl-8">
                        <label htmlFor="inputCombustivel">Combustível</label>
                        <input type="text" className="shadow hover:shadow-md border border-slate-400 py-2 rounded-lg" id="inputCombustivel"/>
                    </div>

                    <div className="flex flex-col gap-3 bg-white">
                        <label htmlFor="inputFipeRef">Mês de Ref.</label>
                        <input type="text" className="shadow hover:shadow-md border border-slate-400 py-2 rounded-lg" id="inputFipeRef"/>
                    </div>

                    <div className="flex flex-col gap-3 bg-white">
                        <label htmlFor="inputFipeCod">Cód. FIPE</label>
                        <input type="text" className="shadow hover:shadow-md border border-slate-400 py-2 rounded-lg" id="inputFipeCod"/>
                    </div>
                    
                    <div className="flex flex-col gap-3 bg-white pr-8">
                        <label htmlFor="inputValor">Valor - R$</label>
                        <input type="text" className="shadow hover:shadow-md border border-slate-400 py-2 rounded-lg" id="inputCombustivel"/>
                    </div>
                </div>
            </div>
        </div>
    )

}