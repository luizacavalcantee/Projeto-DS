import { Challenge } from "@/assets";
import Card from "@/components/challenge-card";
import Footer from '@/components/footer';
import ImpactNumbers from "@/components/number"; // Importa o componente


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <ImpactNumbers /> {/* Agora está sendo usado */}
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