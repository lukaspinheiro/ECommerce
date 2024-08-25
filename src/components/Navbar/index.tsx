import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="bg-gradient-to-r from-teal-950 to-teal-700 fixed top-0 w-full flex justify-between items-center py-2">
            <ul className="flex justify-between items-center mx-10 gap-16">
                <img src="/images/icon.png" className="size-20" alt="" />
                <li className="text-white">
                    <Link
                        href={{
                            pathname: '/',
                        }}
                    >Catálogo</Link>
                </li>

                <li className="text-white">
                    <Link
                        href={{
                            pathname: '/Consultar'                 
                        }}
                    >Consultar Veículo</Link>
                </li>

                <li className="text-white">
                    <Link
                        href={{
                            pathname: '/Editar'                 
                        }}
                    >Cadastrar Veículo</Link>
                </li>
            </ul>

            <div>
                <input type="text" className="shadow-md hover:shadow-lg border border-slate-400 px-6 py-1 rounded-lg mx-10"/>
            </div>
        </div>
    )
}

export default Navbar