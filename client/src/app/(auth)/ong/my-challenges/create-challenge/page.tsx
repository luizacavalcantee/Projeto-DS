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
import { Calendar } from '@/components/ui/calendar';
import React, { useState, useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Upload } from '@/assets';

type FormData = {
  nomeProjeto: string;
  localizacaoDesafio: string;
  descricao: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  idadeIdeal: string;
  secretaria: string;
  categoria: string;
  tituloCheckpoint1: string;
  tituloCheckpoint2: string;
  tituloCheckpoint3: string;
  imagem?: FileList;
  anexos?: FileList;
};

export default function CreateChallenge() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      dataInicio: null,
      dataFim: null,
      idadeIdeal: '',
      categoria: ''
    }
  });

  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);

  const attachmentsInputRef = useRef<HTMLInputElement>(null);

  const imageFile = watch('imagem');
  const attachmentFiles = watch('anexos');

  const idadeIdealValue = watch('idadeIdeal');
  const categoriaValue = watch('categoria');

  React.useEffect(() => {
    setValue('dataInicio', dataInicio);
  }, [dataInicio, setValue]);

  React.useEffect(() => {
    setValue('dataFim', dataFim);
  }, [dataFim, setValue]);

  const onSubmit = (data: FormData) => {
    console.log('Dados do desafio prontos para enviar:', data);
  };

  return (
    <div>
      <Title pageTitle="Cadastro de desafio" />
      <div className="max-w-7xl mx-auto p-6 ">
        <p className="text-2xl font-bold mb-4">
          Proponha Seu Desafio de Impacto para as Escolas
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Descreva o desafio que sua ONG propõe para as escolas, para que
          possamos conectar os projetos aos voluntários e recursos ideais.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Estrutura simplificada: NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel>Nome do Desafio</NewLabel>
            <NewInput
              id="nomeProjeto"
              placeholder="Digite o nome do projeto"
              {...register('nomeProjeto')}
              className="border"
            />
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="localizacaoDesafio">
              Localização do Desafio
            </NewLabel>
            <NewInput
              id="localizacaoDesafio"
              placeholder="Digite onde o desafio deverá ocorrer"
              {...register('localizacaoDesafio')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DatePicker para Data de Início (já estava correto) */}
            <div className="space-y-2">
              <NewLabel>Data de Início do Desafio</NewLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white/60 border border-gray-300 hover:border-gray-600 focus:border-primary focus:border-[1.5px]',
                      !dataInicio && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? (
                      format(dataInicio, 'PPP', { locale: ptBR })
                    ) : (
                      <span className="font-dmSans">
                        Selecione a data de início
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataInicio ?? undefined}
                    onSelect={(date) => setDataInicio(date ?? null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* DatePicker para Data de Fim (já estava correto) */}
            <div className="space-y-2">
              <NewLabel>Data de Fim do Desafio</NewLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white/60 border border-gray-300 hover:border-gray-600 focus:border-primary focus:border-[1.5px]',
                      !dataFim && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? (
                      format(dataFim, 'PPP', { locale: ptBR })
                    ) : (
                      <span>Selecione a data final</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataFim ?? undefined}
                    onSelect={(date) => setDataFim(date ?? null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* NewLabel acima do NewTextarea */}
          <div className="space-y-1">
            <NewLabel htmlFor="descricao">
              Descrição Detalhada do Desafio
            </NewLabel>
            <NewTextarea
              id="descricao"
              placeholder="Descreva os detalhes do desafio proposto"
              {...register('descricao')}
            />
          </div>

          {/* NewLabel acima do NewSelect */}
          <div className="space-y-1">
            <NewLabel htmlFor="idadeIdeal">Idade Ideal dos Alunos</NewLabel>
            <NewSelect
              onValueChange={(value) => setValue('idadeIdeal', value)}
              value={idadeIdealValue}
            >
              <NewSelectTrigger id="idadeIdeal">
                <NewSelectValue placeholder="Selecione nível de ensino ideal" />
              </NewSelectTrigger>
              <NewSelectContent className="z-50 bg-white shadow-lg">
                <NewSelectItem value="Educação Infantil">
                  Educação Infantil
                </NewSelectItem>
                <NewSelectItem value="Ensino Fundamental 1">
                  Ensino Fundamental 1
                </NewSelectItem>
                <NewSelectItem value="Ensino Fundamental 2">
                  Ensino Fundamental 2
                </NewSelectItem>
                <NewSelectItem value="Ensino Médio">Ensino Médio</NewSelectItem>
              </NewSelectContent>
            </NewSelect>
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="secretaria">Recursos Necessários</NewLabel>
            <NewInput
              id="secr</NewSelectTrigger>etaria"
              placeholder="Cite os recursos necessários para executar o desafio"
              {...register('secretaria')}
            />
          </div>

          {/* NewLabel acima do NewSelect */}
          <div className="space-y-1">
            <NewLabel htmlFor="categoria">Categoria do Desafio</NewLabel>
            <NewSelect
              onValueChange={(value) => setValue('categoria', value)}
              value={categoriaValue}
            >
              <NewSelectTrigger id="categoria">
                <NewSelectValue placeholder="Selecione a categoria" />
              </NewSelectTrigger>
              <NewSelectContent className="z-50 bg-white shadow-lg">
                <NewSelectItem value="Educação">Educação</NewSelectItem>
                <NewSelectItem value="Saúde">Saúde</NewSelectItem>
                <NewSelectItem value="Meio Ambiente">
                  Meio Ambiente
                </NewSelectItem>
                <NewSelectItem value="Cultura">Cultura</NewSelectItem>
                <NewSelectItem value="Esporte">Esporte</NewSelectItem>
                <NewSelectItem value="Tecnologia">Tecnologia</NewSelectItem>
                <NewSelectItem value="Cidadania">Cidadania</NewSelectItem>
                <NewSelectItem value="Inclusão">Inclusão</NewSelectItem>
                <NewSelectItem value="Sustentabilidade">
                  Sustentabilidade
                </NewSelectItem>
              </NewSelectContent>
            </NewSelect>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Informações para o acompanhamento do desafio
            </h3>
            <p className="text-sm text-muted-foreground">
              Para ser possível acompanhar o andamento do seu desafio é
              necessário que você divida esse desafio em 3 etapas e dê um título
              para cada uma delas.
            </p>
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint1">
              Título do checkpoint 1
            </NewLabel>
            <NewInput
              id="tituloCheckpoint1"
              placeholder="Título da primeira etapa"
              {...register('tituloCheckpoint1')}
            />
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint2">
              Título do checkpoint 2
            </NewLabel>
            <NewInput
              id="tituloCheckpoint2"
              placeholder="Título da segunda etapa"
              {...register('tituloCheckpoint2')}
            />
          </div>

          {/* NewLabel acima do NewInput */}
          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint3">
              Título do checkpoint 3
            </NewLabel>
            <NewInput
              id="tituloCheckpoint3"
              placeholder="Título da terceira etapa"
              {...register('tituloCheckpoint3')}
            />
          </div>

          {/* --- SEÇÃO DE UPLOAD DE IMAGEM --- */}
          <div className="space-y-2 pt-4">
            <NewLabel
              className="text-xl font-semibold"
              htmlFor="imagem-upload"
            >
              Imagem do desafio
            </NewLabel>
            <p className="text-sm text-muted-foreground">
              Escolha uma imagem para representar o desafio
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
              {...register('imagem')}
            />
            {imageFile && imageFile.length > 0 && (
              <div className="mt-2 text-sm text-muted-foreground">
                <strong>Arquivo selecionado:</strong> {imageFile[0].name}
              </div>
            )}
          </div>

          {/* --- SEÇÃO DE ANEXAR ARQUIVOS --- */}
          <div className="space-y-2 pt-4">
            <NewLabel className="text-xl font-semibold">
              Anexar arquivos
            </NewLabel>
            <p className="text-sm text-muted-foreground">
              Anexe documentos relevantes referente ao desafio. (Max: 5MB por
              arquivo).
            </p>
          </div>
          <div>
            <Input
              id="file-attachments"
              type="file"
              className="hidden"
              multiple
              ref={attachmentsInputRef}
              {...register('anexos')}
            />
            <NewButton
              variant={'lightBlue'}
              size={'lg'}
              className="flex items-center justify-center gap-2"
            >
              <Image
                src={Upload}
                alt="Upload Icon"
              />
              <span className="text-white">Carregar arquivo(s)</span>
            </NewButton>
            {attachmentFiles && attachmentFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-semibold">Arquivos selecionados:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {Array.from(attachmentFiles).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-center">
            <NewButton type="submit" className="min-w-96 font-medium">
              Propor desafio
            </NewButton>
          </div>
        </form>
      </div>
    </div>
  );
}
