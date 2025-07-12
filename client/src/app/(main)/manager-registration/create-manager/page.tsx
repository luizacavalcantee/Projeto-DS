'use client';

import { useForm } from 'react-hook-form';
import { NewInput } from '@/components/ui/new-input';
import { NewTextarea } from '@/components/ui/new-textarea';
import { Button } from '@/components/ui/button';
import { NewButton } from '@/components/ui/new-button';
import { NewLabel } from '@/components/ui/new-label';
import {
  NewSelect,
  NewSelectContent,
  NewSelectItem,
  NewSelectTrigger,
  NewSelectValue
} from '@/components/ui/new-select';
import Title from '@/components/title';
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Upload } from '@/assets';
import { useRouter } from 'next/navigation';

type FormData = {
  // Informações do gestor
  nomeCompletoGestor: string;
  cargoFuncaoEscola: string;
  celularGestor: string;
  emailGestor: string;
  confirmarEmailGestor: string;
  senha: string; 
  confirmarSenha: string;

  // Informações da escola
  nomeEscola: string;
  tipoEnsinoOferecido: string; 
  numeroAlunosEstimado: string; 
  codigoINEP: string;
  cepEscola: string;
  enderecoEscola: string;
  numeroEndereco: string;
  complementoEndereco: string;
  telefoneEscola: string;

  // Imagem da escola
  imagemEscola?: FileList;
};

export default function RegisterManagerPage() { // Renomeado o componente
  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      // Definir valores padrão para os campos do formulário
      nomeCompletoGestor: '',
      cargoFuncaoEscola: '',
      celularGestor: '',
      emailGestor: '',
      confirmarEmailGestor: '',
      senha: '', 
      confirmarSenha: '',
      nomeEscola: '',
      tipoEnsinoOferecido: '',
      numeroAlunosEstimado: '',
      codigoINEP: '',
      cepEscola: '',
      enderecoEscola: '',
      numeroEndereco: '',
      complementoEndereco: '',
      telefoneEscola: '',
      imagemEscola: undefined, // Valor padrão para FileList
    }
  });

  // Watch para a imagem selecionada (para exibir o nome do arquivo)
  const imagemEscolaFile = watch('imagemEscola');

  // Função que será chamada ao submeter o formulário
  const onSubmit = (data: FormData) => {
    console.log('Dados do Cadastro de Gestor prontos para enviar:', data);
    // Aqui você faria a chamada para a sua API de cadastro do gestor
    // Ex: fetch('/api/cadastrar-gestor', { method: 'POST', body: JSON.stringify(data) });

    // Após a submissão, você pode redirecionar o usuário
    // router.push('/caminho-para-dashboard-do-gestor');
  };

  const handleReturn = () => {
    router.back(); // Volta para a página anterior
  };

  return (
    <div>
      <Title pageTitle="Cadastro de desafio" />
      <div className="max-w-7xl mx-auto p-6 ">
        <h3 className="text-xl font-semibold">
          Informações do gestor
        </h3>
        <p className="text-sm text-muted-foreground mb-8">
         Insira primeiro as suas informações como responsável pela sua escola no Bora Impactar.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Estrutura simplificada: NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel>Nome do Gestor</NewLabel>
            <NewInput
              id="nomeCompletoGestor"
              placeholder="Digite o nome completo do gestor"
              {...register('nomeCompletoGestor')}
              className="border"
            />
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="cargoFuncaoEscola">
              Cargo/Função na Escola
            </NewLabel>
            <NewInput
              id="cargoFuncaoEscola"
              placeholder="Digite seu cargo ou função na escola"
              {...register('cargoFuncaoEscola')}
            />
          </div>

          {/* NewLabel acima do NewTextarea */}
          <div className="space-y-1">
            <NewLabel htmlFor="celularGestor">
              Celular
            </NewLabel>
            <NewTextarea
              id="celularGestor"
              placeholder="Informe o número do celular do gestor"
              {...register('celularGestor')}
            />
          </div>

          {/* NewLabel acima do NewTextarea */}  
          <div className="space-y-1">
            <NewLabel htmlFor="emailGestor">
              E-mail
            </NewLabel>
            <NewTextarea
              id="emailGestor"
              placeholder="Informe o número do celular do gestor"
              {...register('emailGestor')}
            />
          </div>

          {/* NewLabel acima do NewTextarea */}  
          <div className="space-y-1">
            <NewLabel htmlFor="senha">
              Senha
            </NewLabel>
            <NewTextarea
              id="senha"
              placeholder="Informe sua senha"
              {...register('senha')}
            />
          </div>

          {/* NewLabel acima do NewTextarea */}  
          <div className="space-y-1">
            <NewLabel htmlFor="confirmarsenha">
              Confirmar Senha
            </NewLabel>
            <NewTextarea
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              {...register('confirmarSenha')}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Informações da escola
            </h3>
            <p className="text-sm text-muted-foreground">
              Agora insira as informações referentes a escola pela qual você é responsável.
            </p>
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="nomeEscola">
              Nome da Escola
            </NewLabel>
            <NewInput
              id="nomeEscola"
              placeholder="Insira o nome da escola"
              {...register('nomeEscola')}
            />
          </div>

          {/* --- SEÇÃO DE UPLOAD DE IMAGEM --- */}
          <div className="space-y-2 pt-4">
            <NewLabel
              className="text-xl font-semibold"
              htmlFor="imagem-upload"
            >
              Imagem da escola
            </NewLabel>
            <p className="text-sm text-muted-foreground">
              Escolha uma imagem para representar a escola.
            </p>
          </div>
          <div>
            <NewLabel
              htmlFor="imagem-upload"
              className="flex flex-col items-center bg-white/60 justify-center w-full h-32 px-4 py-6 text-center border border-gray-300 border-dashed rounded-lg cursor-pointer text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <UploadCloud className="w-8 h-8" />
              <span className="mt-2 text-sm font-medium">
                Clique para fazer upload
              </span>
              <span className="mt-1 text-xs">SVG, PNG, JPG or GIF</span>
            </NewLabel>
            <Input
              id="imagem-upload"
              type="file"
              className="hidden"
              accept="image/svg+xml, image/png, image/jpeg, image/gif"
              {...register('imagemEscola')}
            />
           {imagemEscolaFile && imagemEscolaFile.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                    <strong>Arquivo selecionado:</strong> {imagemEscolaFile[0].name}
                </div>
            )}
          </div>

          <div className="pt-6 flex justify-center">
            <NewButton type="submit" className="min-w-96 font-medium" onClick={handleReturn}>
              Cadastrar
            </NewButton>
          </div>
        </form>
      </div>
    </div>
  );
}
