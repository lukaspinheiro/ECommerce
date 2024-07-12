'use client'

import { useState } from "react"
import Input from "../components/Input"

export default function Login() {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = () => {
        console.log(name);
        console.log(password);
        
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
            <div className="flex flex-col gap-3 bg-white p-16 rounded-lg">
                <Input
                    label="Login"
                    data={name}
                    setData={setName}
                />
                <Input
                    label="Senha"
                    data={password}
                    setData={setPassword}
                />

                <button className="border-2 py-2 px-5 rounded-full bg-teal-500 shadow hover:shadow-md hover:bg-gradient-to-r from-teal-900 to-teal-500" onClick={onSubmit}>Entrar</button>
            </div>
        </div>
    )
}