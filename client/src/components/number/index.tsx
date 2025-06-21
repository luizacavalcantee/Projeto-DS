import React from "react";

export default function ImpactNumbers() {
  return (
    <section className="w-full bg-gradient-to-r from-[#26BDE2] to-[#009FE3] py-12 mb-12">
      <div className="w-full px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Nosso Impacto em Números
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full px-64">
          <div className="text-center flex-1">
            <span className="text-6xl font-bold text-white block">55+</span>
            <span className="text-white font-semibold block mt-2 whitespace-nowrap">Escolas Engajadas</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-6xl font-bold text-white block">20+</span>
            <span className="text-white font-semibold block mt-2 whitespace-nowrap">ONGs impactadas</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-6xl font-bold text-white block">150+</span>
            <span className="text-white font-semibold block mt-2 whitespace-nowrap">Desafios Concluídos</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-6xl font-bold text-white block">10K+</span>
            <span className="text-white font-semibold block mt-2 whitespace-nowrap">Estudantes Impactados</span>
          </div>
        </div>
      </div>
    </section>
  );
}