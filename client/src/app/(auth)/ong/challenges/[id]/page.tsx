import {
  ChallengeCover,
  Check,
  Checkpoint1,
  Checkpoint2,
  Checkpoint3,
  CoracaoQuentinho,
  Facebook,
  Instagram
} from '@/assets';
import Title from '@/components/title';
import Image from 'next/image';
import { File } from 'lucide-react';
import Link from 'next/link';

export default function ChallengeDetailsOng() {
  return (
    <>
      <main className="pb-16">
        <Title pageTitle="Detalhes do desafio" />

        <div className="mx-16">
          <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg mt-10">
            <Image
              src={ChallengeCover}
              alt="Crianças lendo em uma biblioteca"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <article className="mt-8 text-textBlack">
            <header>
              <h1 className="text-3xl font-bold">
                Horta Comunitária na Escola
              </h1>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-detailsBackground p-6 rounded-xl">
                  <p className="text-base font-medium">Idade ideal</p>
                  <p className="text-2xl font-bold">14 anos</p>
                </div>
                <div className="bg-detailsBackground p-6 rounded-xl">
                  <p className="text-base font-medium">Data de término</p>
                  <p className="text-2xl font-bold">26/06/2025</p>
                </div>
                <div className="bg-detailsBackground p-6 rounded-xl">
                  <p className="text-base font-medium">Escolas participando</p>
                  <p className="text-2xl font-bold">3 escolas</p>
                </div>
              </div>
            </header>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Detalhes do desafio</h2>
              <p className="mt-3 text-justify font-light text-lg">
                A Campanha de Conscientização Ambiental visa engajar alunos em
                ações práticas de educação ambiental, focando na redução do
                lixo, reciclagem e conservação dos recursos naturais. As
                atividades incluem palestras com especialistas, criação de
                materiais educativos e a implementação de um sistema de coleta
                seletiva na escola. Nosso objetivo é criar uma cultura de
                sustentabilidade, mostrando que pequenas ações podem gerar um
                impacto positivo duradouro. Esperamos que este desafio capacite
                os estudantes a serem agentes de mudança ambiental.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Metas e Checkpoints</h2>
              <ul className="mt-6">
                <li className="flex h-16">
                  <div className="flex flex-col items-center mr-4 pt-2 gap-1">
                    <div>
                      <div className="flex items-center justify-center w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div className="w-px h-full border-l border-gray-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <h3 className="font-medium">Checkpoint 1</h3>
                      <Image src={Check} alt="Check" className="ml-2 h-4 w-4" />
                    </div>
                    <p className="text-sm text-textGray">
                      1 de setembro de 2022
                    </p>
                  </div>
                </li>

                <li className="flex h-16">
                  <div className="flex flex-col items-center mr-4 pt-2 gap-1">
                    <div>
                      <div className="flex items-center justify-center w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div className="w-px h-full border-l border-gray-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium">Checkpoint 2</h3>
                    <p className="text-sm text-textGray">
                      15 de setembro de 2022
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex flex-col items-center mr-4 pt-2">
                    <div>
                      <div className="flex items-center justify-center w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium">Checkpoint 3</h3>
                    <p className="text-sm text-textGray">
                      30 de setembro de 2022
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Materiais de suporte</h2>
              <div className="mt-4 bg-white/60 shadow rounded-md">
                <div className="flex items-center p-4 gap-4">
                  <div className="bg-detailsBackground p-3 rounded-lg">
                    <File className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium">Como fazer alguma coisa</h3>
                    <p className="text-sm text-textGray">
                      Clique e veja o material anexado
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 gap-4">
                  <div className="bg-detailsBackground p-3 rounded-lg">
                    <File className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium">Como fazer alguma coisa</h3>
                    <p className="text-sm text-textGray">
                      Clique e veja o material anexado
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold">ONG Responsável</h2>
              <div className="mt-4 bg-white/60 p-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-6">
                <Link
                  href="https://coracaoquentinho.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Site da ONG Coração Quentinho"
                >
                  <div className="w-48 h-48">
                    <Image
                      src={CoracaoQuentinho}
                      alt="Logo da ONG Coração Quentinho"
                      width={192}
                      height={192}
                      className="rounded-md cursor-pointer object-contain w-full h-full"
                    />
                  </div>
                </Link>
                <div>
                  <h3 className="text-xl font-bold">Coração Quentinho</h3>

                  <p className="mt-2 text-justify">
                    A Campanha de Conscientização Ambiental visa engajar alunos
                    em ações práticas de educação ambiental, focando na redução
                    do lixo, reciclagem e conservação dos recursos naturais.
                    Acreditamos no poder da educação para transformar realidades
                    e gerar um impacto positivo duradouro. Esperamos que este
                    desafio capacite os estudantes a serem agentes de mudança
                    ambiental.
                  </p>
                  <div className="flex justify-between">
                    <address className="mt-4 flex flex-col gap-y-1 not-italic">
                      <a href="tel:+5581998975396" className="hover:underline">
                        (81) 99897-5396
                      </a>
                      <a
                        href="mailto:emaildaong@gmail.com"
                        className="hover:underline"
                      >
                        emaildaong@gmail.com
                      </a>
                    </address>

                    <div className="mt-4 flex items-end gap-x-4">
                      <Link
                        href="https://facebook.com/ongcoracaoquentinho"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook da ONG Coração Quentinho"
                      >
                        <Image
                          src={Facebook}
                          alt="Logo do Facebook"
                          className="h-6 w-6"
                        />
                      </Link>
                      <Link
                        href="https://instagram.com/ongcoracaoquentinho"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram da ONG Coração Quentinho"
                      >
                        <Image
                          src={Instagram}
                          alt="Logo do Instagram"
                          className="h-6 w-6"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Galeria de Impacto</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <figure>
                  <Image
                    src={Checkpoint3}
                    alt="Imagem do checkpoint 1"
                    className="rounded-xl shadow-md w-full h-64 object-cover"
                  />
                  <figcaption className="mt-2 text-sm">
                    <strong className="text-base">Checkpoint 1</strong>
                    <p className="text-justify text-textGray">
                      Pequeno texto descrevendo sobre o check point com um
                      limite de 3 linhas de texto que são 70 caracteres.
                    </p>
                  </figcaption>
                </figure>

                <figure>
                  <Image
                    src={Checkpoint2}
                    alt="Imagem do checkpoint 2"
                    className="rounded-xl shadow-md w-full h-64 object-cover"
                  />
                  <figcaption className="mt-2 text-sm">
                    <strong className="text-base">Checkpoint 2</strong>
                    <p className="text-justify text-textGray">
                      Pequeno texto descrevendo sobre o check point com um
                      limite de 3 linhas de texto que são 70 caracteres.
                    </p>
                  </figcaption>
                </figure>

                <figure>
                  <Image
                    src={Checkpoint1}
                    alt="Imagem do checkpoint 3"
                    className="rounded-xl shadow-md w-full h-64 object-cover"
                  />
                  <figcaption className="mt-2 text-sm">
                    <strong className="text-base">Checkpoint 3</strong>
                    <p className="text-justify text-textGray">
                      Pequeno texto descrevendo sobre o check point com um
                      limite de 3 linhas de texto que são 70 caracteres.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}