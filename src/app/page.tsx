'use client'

import { Card } from "@/components/Card";
import veiculos from "@/veiculos.json"
import { CrudApi } from "@/api/CrudApi"
import { useContext, useEffect, useRef, useState } from "react"
import Navbar from "@/components/Navbar";
import { VehicleContext } from "@/context/VehicleContext";


export default function Catalogo() {

  const [ vehicles, setVehicles ]= useState([])
  const {setUrl} = useContext(VehicleContext)

  const fetchVehicle = async () => {
    try {
        const res = await CrudApi.get(`vehicle`)
        console.log(""+res.data);
        setVehicles(res.data)   
    }
    catch (err) {
        console.log(err);
    }
  }
 
   useEffect(() => {
     fetchVehicle()  
   }, [])


  return (
    <div className="h-screen w-full overflow-y-auto pt-28 gap-5 bg-gradient-to-r from-teal-900 to-teal-300">
      <Navbar/>
      <div className="grid grid-cols-3 justify-items-center p-8  pl-28 pr-28 gap-3 gap-y-10">
        {
          vehicles.map((v: any, i)=> (
            <Card key={`card-veiculos-${i}`} data={v} setUrl={setUrl}/>
          ))
        }
      </div>
    </div>
  );
}
