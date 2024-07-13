interface InputProps {
    label: string
    setData: (e:string)=>void
    data: string
}

export default function Input({ label, data, setData }: InputProps) {
    return (
        <>
            <label htmlFor="password">{label}</label>
            <input onChange={(text)=> setData(text.target.value)} value={data} className="shadow hover:shadow-md border-2 py-2 px-5 rounded-full" id="password" />
        </>
    )
}