export default function ImpactNumbers() {
  return (
    <section className="w-full bg-gradient-to-r from-[#26BDE2] to-[#009FE3] py-10 md:py-12 mb-12">
      <div className="w-full px-4 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-10">
          Nosso Impacto em Números
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-16 w-full max-w-6xl">
          <div className="text-center flex-1">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white block">55+</span>
            <span className="text-sm md:text-base text-white font-semibold block mt-1">Escolas Engajadas</span>
          </div>

          <div className="text-center flex-1">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white block">20+</span>
            <span className="text-sm md:text-base text-white font-semibold block mt-1">ONGs impactadas</span>
          </div>
          
          <div className="text-center flex-1">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white block">150+</span>
            <span className="text-sm md:text-base text-white font-semibold block mt-1">Desafios Concluídos</span>
          </div>

          <div className="text-center flex-1">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white block">10K+</span>
            <span className="text-sm md:text-base text-white font-semibold block mt-1">Estudantes Impactados</span>
          </div>
        </div>
      </div>
    </section>
  );
}