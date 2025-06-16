import Card from "components/challenge-card";
import { Challenge } from "assets";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center gap-10">
      <Card
        imageSrc={Challenge}
        imageAlt="Crianças na horta comunitária"
        title="Horta Comunitária na Escola"
        description="Construa uma horta na escola e ensine sobre sustentabilidade."
        progress={100}
        link="#"
        linkLabel="Detalhes"
      />
      <Card
        imageSrc={Challenge}
        imageAlt="Crianças na horta comunitária"
        title="Horta Comunitária na Escola"
        description="Construa uma horta na escola e ensine sobre sustentabilidade."
        progress={30}
        link="#"
        linkLabel="Detalhes"
      />
    </div>
  );
}
