interface InputDropProps {
    label: string
    name: string
}

export const InputDrop = ({label, name}: InputDropProps) => {
    return (
        <>
        <label htmlFor="selectMarca">Marca</label>
        <input onChange={(e)=> console.log(e)} id="selectMarca" className="shadow-md hover:shadow-lg border border-slate-400 py-2 rounded-lg" />
        </>
    )
}