'use client';

import Card from "components/challenge-card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center">
      <Card
        imageSrc="/img/card_desafio.png"
        imageAlt="Crianças na horta comunitária"
        title="Horta Comunitária na Escola"
        description="Construa uma horta na escola e ensine sobre sustentabilidade."
        progress={60}
        link="#"
        linkLabel="Detalhes"
      />
    </div>
  );
}
