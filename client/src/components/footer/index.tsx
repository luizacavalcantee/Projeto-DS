import  { Logo } from "../../assets/index";
import Image from "next/image";

export default function Footer(){
    return(
        <div className="pt-12 bg-[#009FE3] min-h-[200px] py-10">
            <div className="flex justify-between">
                <div className="w-48 ml-32">

                    <div className="mb-5">
                        <Image src={Logo} alt="Logo" className="w-auto h-auto" />
                    </div>
                    <p className=" text-white font-bold text-2xl text-left whitespace-nowrap"> 
                        Bora Impactar 
                    </p>
                    <ul>
                        <li className="mb-2">
                            <a href="" className="text-white text-left">A união que transforma vidas</a>
                        </li>
                    </ul>
                </div>
                <div className="ml-16 mr-[740px]">
                    <p className="text-white font-bold text-2xl text-left">
                        Portal
                    </p>
                    <ul className="mb-[90px]">
                        <li className="mb-2">
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Voluntariado e doação
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Doação de sangue
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Imposto de renda
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Área da ONG
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left whitespace-nowrap">
                                Agenda de eventos
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}