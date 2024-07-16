import { Card } from "@/components/Card";
import veiculos from "@/veiculos.json"
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center bg-gradient-to-r from-teal-900 to-teal-300">
      {
        veiculos.veiculos.map((v, i)=> (
          <Card key={i} brand={v.Marca} model={v.Modelo} value={v.Valor} vehicle={v.TipoVeiculo} year={v.AnoModelo} />
        ))
      }
    </div>
  );
}
