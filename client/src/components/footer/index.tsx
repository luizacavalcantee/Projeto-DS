import  { Logo } from "@/assets";
import Image from "next/image";

export default function Footer(){
    return(
        <footer className="pt-12 bg-primary pb-16">
            <div className="flex justify-between gap-32">
                <div className="w-48 ml-32">
                    <Image src={Logo} alt="Logo" className="w-auto h-auto mb-10 mt-2" />
                    <p className=" text-white font-bold text-2xl text-left whitespace-nowrap mb-2"> 
                        Bora Impactar 
                    </p>
                    <p className="text-white text-left whitespace-nowrap">A união que transforma vidas</p>
                </div>
                <div className="mr-auto">
                    <p className="text-white font-bold text-2xl text-left mb-3">
                        Portal
                    </p>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Voluntariado e doação
                            </a>
                        </li>
                        <li>
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Doação de sangue
                            </a>
                        </li>
                        <li>
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Imposto de renda
                            </a>
                        </li>
                        <li>
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Área da ONG
                            </a>
                        </li>
                        <li>
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Agenda de eventos
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}