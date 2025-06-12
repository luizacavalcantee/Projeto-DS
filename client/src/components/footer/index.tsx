import { Logo } from "../../assets/index"

export default function Footer(){
    return(
        <div className="bg-[#009FE3] min-h-[200px] py-10">
            <div className="flex justify-between items-center">
                <div className="ml-32">

                    <div className="mb-5">
                        <img src={Logo} alt="Logo" className="w-auto h-auto" />
                    </div>
                    <p className="text-white font-bold text-2xl text-left p-5 whitespace-nowrap"> 
                        Bora Impactar 
                    </p>
                    <ul>
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5">Sobre nós</a>
                        </li>
                    </ul>
                </div>
                <div className="ml-16 mr-[740px]">
                    <p className="mt-[44px] text-white font-bold text-2xl text-left p-5">
                        Portal
                    </p>
                    <ul className="mb-[90px]">
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5 whitespace-nowrap">
                                Voluntariado e doação
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5 whitespace-nowrap">
                                Doação de sangue
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5 whitespace-nowrap">
                                Imposto de renda
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5 whitespace-nowrap">
                                Área da ONG
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="" className="text-white text-left p-5 whitespace-nowrap">
                                Agenda de eventos
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}