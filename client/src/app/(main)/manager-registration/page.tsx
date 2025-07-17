import React from 'react';

export default function ManagerRegistration() {
  return (
    // Container principal com fundo cinza claro e fonte Inter
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {/* Script para carregar Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Script para carregar ícones Lucide React */}
      <script src="https://unpkg.com/lucide-react@latest"></script>

      {/* Conteúdo principal do formulário */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          {/* Seção superior de título e logo */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {/* Ícone de seta para trás */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left text-gray-500">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Cadastro de Gestor de Escola</h1>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form className="space-y-8">
            {/* Seção: Informações do gestor */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações do gestor</h2>
              <p className="text-gray-600 text-sm md:text-base">
                  Preencha primeiro as suas informações como responsável pela sua escola no Bora Impactar
                </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Completo do Gestor */}
                <div>
                  <label htmlFor="nomeGestor" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo do Gestor</label>
                  <input
                    type="text"
                    id="nomeGestor"
                    placeholder="Digite o nome completo do gestor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Cargo/Função na Escola */}
                <div>
                  <label htmlFor="cargoFuncao" className="block text-sm font-medium text-gray-700 mb-1">Cargo/Função na Escola</label>
                  <input
                    type="text"
                    id="cargoFuncao"
                    placeholder="Digite seu cargo ou função na escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Celular */}
                <div>
                  <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                  <input
                    type="tel"
                    id="celular"
                    placeholder="Informe o número do celular do gestor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Informe o e-mail do gestor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Confirmar e-mail */}
                <div className="md:col-span-2"> {/* Ocupa 2 colunas em telas maiores */}
                  <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-1">Confirmar e-mail</label>
                  <input
                    type="email"
                    id="confirmEmail"
                    placeholder="Confirme o e-mail do gestor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Seção: Informações da escola */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações da escola</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nome da escola */}
                <div>
                  <label htmlFor="nomeEscola" className="block text-sm font-medium text-gray-700 mb-1">Nome da escola</label>
                  <input
                    type="text"
                    id="nomeEscola"
                    placeholder="Insira o nome da escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Etapas de Ensino Oferecidas */}
                <div>
                  <label htmlFor="etapasEnsino" className="block text-sm font-medium text-gray-700 mb-1">Etapas de Ensino Oferecidas</label>
                  <select
                    id="etapasEnsino"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Selecione as etapas</option>
                    <option value="educacaoInfantil">Educação Infantil</option>
                    <option value="ensinoFundamental1">Ensino Fundamental 1</option>
                    <option value="ensinoFundamental2">Ensino Fundamental 2</option>
                    <option value="eja">EJA (Educação de Jovens e Adultos)</option>
                    <option value="ensinoTecnico">Ensino Técnico</option>
                    <option value="ensinoIntegral">Ensino Integral</option>
                  </select>
                </div>
                {/* Número estimado de alunos */}
                <div>
                  <label htmlFor="numAlunos" className="block text-sm font-medium text-gray-700 mb-1">Número estimado de alunos</label>
                  <input
                    type="number"
                    id="numAlunos"
                    placeholder="Informe o número estimado de alunos"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Código/INEP */}
                <div>
                  <label htmlFor="codigoInep" className="block text-sm font-medium text-gray-700 mb-1">Código/INEP</label>
                  <input
                    type="text"
                    id="codigoInep"
                    placeholder="Insira o código INEP da escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* CEP */}
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    placeholder="Informe o CEP da escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Endereço escola */}
                <div>
                  <label htmlFor="enderecoEscola" className="block text-sm font-medium text-gray-700 mb-1">Endereço escola</label>
                  <input
                    type="text"
                    id="enderecoEscola"
                    placeholder="Informe o endereço da escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Número */}
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="text"
                    id="numero"
                    placeholder="Informe o número do endereço"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Complemento */}
                <div>
                  <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    placeholder="Informe o complemento do endereço"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    placeholder="Informe o telefone da escola"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Seção: Imagem da escola */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Imagem da escola</h2>
              <p className="text-gray-600 text-sm mb-4">Escolha uma imagem para representar a escola</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
                {/* Ícone de upload */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload mx-auto text-gray-400 mb-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" x2="12" y1="3" y2="15"/>
                </svg>
                <p className="text-blue-600 font-medium">Clique para fazer upload</p>
                <p className="text-gray-500 text-sm">SVG, PNG, JPG ou GIF</p>
              </div>
            </div>

            {/* Botão Cadastrar */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
