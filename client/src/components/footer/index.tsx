import { Logo } from '@/assets';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="pt-12 bg-primary pb-16 px-8 md:px-0">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-12 md:gap-32 md:ml-32">
        <div className="w-48">
          <Image src={Logo} alt="Logo" className="w-auto h-auto mx-auto md:mx-0 mb-10 mt-2" />
          <p className="text-white font-bold text-2xl mb-2">
            Bora Impactar
          </p>
          <p className="text-white">
            A união que transforma vidas
          </p>
        </div>
        <div className="md:mr-auto">
          <p className="text-white font-bold text-2xl mb-3">Portal</p>
          <ul className="flex flex-col items-center md:items-start gap-2">
            <li>
              <a href="" className="text-white">
                Voluntariado e doação
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Doação de sangue
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Imposto de renda
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Área da ONG
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Agenda de eventos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
