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
        <div className="w-full h-screen bg-teal-900 flex justify-center items-center">
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

                <button onClick={onSubmit}>Entrar</button>
            </div>
        </div>
    )
}