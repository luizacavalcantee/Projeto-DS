import { Challenge } from "@/assets";
import Card from "@/components/challenge-card";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card
        imageSrc={Challenge}
        imageAlt="Crianças na horta comunitária"
        title="Horta Comunitária na Escola"
        description="Construa uma horta na escola e ensine sobre sustentabilidade."
        progress={50}
        link="#"
        linkLabel="Detalhes"
      />
    </div>
  );
}