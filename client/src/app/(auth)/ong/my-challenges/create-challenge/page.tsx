'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Title from '@/components/title';
import { Calendar } from '@/components/ui/calendar';
import React, { useState, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Importação do locale ptBR
import { CalendarIcon } from 'lucide-react';

type FormData = {
  nomeProjeto: string;
  liderDesafio: string;
  descricao: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  nomeContato: string;
  telefoneContato: string;
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
      categoria: '',
    },
  });

  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentsInputRef = useRef<HTMLInputElement>(null);

  const [selectedImageName, setSelectedImageName] = useState<string>('Nenhum arquivo escolhido');
  const [selectedAttachmentsNames, setSelectedAttachmentsNames] = useState<string[]>([]);

  const tituloCheckpoint1Value = watch('tituloCheckpoint1');
  const tituloCheckpoint2Value = watch('tituloCheckpoint2');
  const tituloCheckpoint3Value = watch('tituloCheckpoint3');

  const nomeProjetoValue = watch('nomeProjeto');
  const liderDesafioValue = watch('liderDesafio');
  const descricaoValue = watch('descricao');
  const nomeContatoValue = watch('nomeContato');
  const telefoneContatoValue = watch('telefoneContato');
  const secretariaValue = watch('secretaria');
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue('imagem', event.target.files);
      setSelectedImageName(event.target.files[0].name);
    } else {
      setValue('imagem', undefined);
      setSelectedImageName('Nenhum arquivo escolhido');
    }
  };

  const handleAttachmentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue('anexos', event.target.files);
      setSelectedAttachmentsNames(Array.from(event.target.files).map(file => file.name));
    } else {
      setValue('anexos', undefined);
      setSelectedAttachmentsNames([]);
    }
  };

  return (
    <div>
      <Title
        pageTitle="Desafio Específico"
      />
      <div className="max-w-7xl mx-auto p-6 ">

        <p className="text-2xl font-bold mb-4">
          Proponha Seu Desafio de Impacto para as Escolas
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Descreva o desafio que sua ONG propõe para as escolas, para que possamos conectar os projetos aos voluntários e recursos ideais.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Floating Label para Nome do Projeto/Desafio */}
          <div className="relative">
            <label
              htmlFor="nomeProjeto"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${nomeProjetoValue || watch().nomeProjeto
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Nome do Projeto/Desafio
            </label>
            <Input
              id="nomeProjeto"
              placeholder={nomeProjetoValue ? '' : ''}
              {...register('nomeProjeto')}
              className="pt-3 pb-2"
            />
          </div>

          {/* Floating Label para Líder/Professor do Desafio */}
          <div className="relative">
            <label
              htmlFor="liderDesafio"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${liderDesafioValue || watch().liderDesafio
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Líder/Professor do Desafio (Nome/Telefone Principal)
            </label>
            <Input
              id="liderDesafio"
              placeholder={liderDesafioValue ? '' : ''}
              {...register('liderDesafio')}
              className="pt-3 pb-2"
            />
          </div>

          {/* Floating Label para Descrição Detalhada do Desafio */}
          <div className="relative">
            <label
              htmlFor="descricao"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${descricaoValue || watch().descricao
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Descrição Detalhada do Desafio
            </label>
            <Textarea
              id="descricao"
              placeholder={descricaoValue ? '' : ''}
              {...register('descricao')}
              className="pt-3 pb-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DatePicker para Data de Início do Desafio */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Data de Início do Desafio</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
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
            {/* DatePicker para Data de Fim do Desafio */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Data de Fim do Desafio</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Floating Label para Nome do Contato para este Desafio */}
            <div className="relative">
              <label
                htmlFor="nomeContato"
                className={`
                  absolute left-3 transition-all duration-200 pointer-events-none
                  ${nomeContatoValue || watch().nomeContato
                    ? '-top-2 text-xs text-gray-500 bg-white px-1'
                    : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }
                `}
              >
                Nome do Contato para este Desafio
              </label>
              <Input
                id="nomeContato"
                placeholder={nomeContatoValue ? '' : ''}
                {...register('nomeContato')}
                className="pt-3 pb-2"
              />
            </div>
            {/* Floating Label para Número de Contato para este Desafio */}
            <div className="relative">
              <label
                htmlFor="telefoneContato"
                className={`
                  absolute left-3 transition-all duration-200 pointer-events-none
                  ${telefoneContatoValue || watch().telefoneContato
                    ? '-top-2 text-xs text-gray-500 bg-white px-1'
                    : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }
                `}
              >
                Número de Contato para este Desafio
              </label>
              <Input
                id="telefoneContato"
                placeholder={telefoneContatoValue ? '' : ''}
                {...register('telefoneContato')}
                className="pt-3 pb-2"
              />
            </div>
          </div>

          {/* Floating Label para Idade Ideal dos Alunos (Select) */}
          <div className="relative">
            <label
              htmlFor="idadeIdeal"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${idadeIdealValue || watch().idadeIdeal
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Idade Ideal dos Alunos
            </label>
            <Select onValueChange={(value) => setValue('idadeIdeal', value)} value={idadeIdealValue}>
              <SelectTrigger id="idadeIdeal" className="pt-3 pb-2">
                <SelectValue placeholder="" /> {/* Placeholder vazio para a label flutuar */}
              </SelectTrigger>
              <SelectContent className="z-50 bg-white shadow-lg">
                <SelectItem value="6-10">6-10 anos</SelectItem>
                <SelectItem value="11-14">11-14 anos</SelectItem>
                <SelectItem value="15-18">15-18 anos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Floating Label para Secretaria responsável */}
          <div className="relative">
            <label
              htmlFor="secretaria"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${secretariaValue || watch().secretaria
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Secretaria responsável
            </label>
            <Input
              id="secretaria"
              placeholder={secretariaValue ? '' : ''}
              {...register('secretaria')}
              className="pt-3 pb-2"
            />
          </div>

          {/* Floating Label para Categoria do Desafio (Select) */}
          <div className="relative">
            <label
              htmlFor="categoria"
              className={`
                absolute left-3 transition-all duration-200 pointer-events-none
                ${categoriaValue || watch().categoria
                  ? '-top-2 text-xs text-gray-500 bg-white px-1'
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                }
              `}
            >
              Categoria do Desafio
            </label>
            <Select onValueChange={(value) => setValue('categoria', value)} value={categoriaValue}>
              <SelectTrigger id="categoria" className="pt-3 pb-2">
                <SelectValue placeholder="" /> {/* Placeholder vazio para a label flutuar */}
              </SelectTrigger>
              <SelectContent className="z-50 bg-white shadow-lg">
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-base font-semibold">
              Informações para o acompanhamento do desafio
            </h3>
            <p className="text-sm text-muted-foreground">
              Para ser possível acompanhar o andamento do seu desafio é necessário que você divida esse desafio em 3 etapas e dê um título para cada uma delas.
            </p>

            {/* Floating Label para Título do checkpoint 1 */}
            <div className="relative">
              <label
                htmlFor="tituloCheckpoint1"
                className={`
                  absolute left-3 transition-all duration-200 pointer-events-none
                  ${tituloCheckpoint1Value || watch().tituloCheckpoint1
                    ? '-top-2 text-xs text-gray-500 bg-white px-1'
                    : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }
                `}
              >
                Título do checkpoint 1
              </label>
              <Input
                id="tituloCheckpoint1"
                placeholder={tituloCheckpoint1Value ? '' : ''}
                {...register('tituloCheckpoint1')}
                className="pt-3 pb-2"
              />
            </div>

            {/* Floating Label para Título do checkpoint 2 - REPLICADO */}
            <div className="relative">
              <label
                htmlFor="tituloCheckpoint2"
                className={`
                  absolute left-3 transition-all duration-200 pointer-events-none
                  ${tituloCheckpoint2Value || watch().tituloCheckpoint2
                    ? '-top-2 text-xs text-gray-500 bg-white px-1'
                    : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }
                `}
              >
                Título do checkpoint 2
              </label>
              <Input
                id="tituloCheckpoint2"
                placeholder={tituloCheckpoint2Value ? '' : ''}
                {...register('tituloCheckpoint2')}
                className="pt-3 pb-2"
              />
            </div>

            {/* Floating Label para Título do checkpoint 3 - REPLICADO */}
            <div className="relative">
              <label
                htmlFor="tituloCheckpoint3"
                className={`
                  absolute left-3 transition-all duration-200 pointer-events-none
                  ${tituloCheckpoint3Value || watch().tituloCheckpoint3
                    ? '-top-2 text-xs text-gray-500 bg-white px-1'
                    : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }
                `}
              >
                Título do checkpoint 3
              </label>
              <Input
                id="tituloCheckpoint3"
                placeholder={tituloCheckpoint3Value ? '' : ''}
                {...register('tituloCheckpoint3')}
                className="pt-3 pb-2"
              />
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <label className="text-base font-semibold">Imagem do desafio</label>
            <p className="text-sm text-muted-foreground">
              Escolha uma imagem para representar o desafio
            </p>
            <div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
              onClick={() => imageInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  setValue('imagem', e.dataTransfer.files);
                  setSelectedImageName(e.dataTransfer.files[0].name);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6H16a5 5 0 012.984 9.126M12 16v.01M12 12l-4 4m4-4l4 4"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Clique para fazer upload
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG ou GIF
              </p>
              {selectedImageName !== 'Nenhum arquivo escolhido' && (
                <p className="mt-2 text-sm text-green-600">Arquivo selecionado: {selectedImageName}</p>
              )}
            </div>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-semibold">Anexar arquivos</label>
            <p className="text-sm text-muted-foreground">
              Anexe documentos relevantes referentes ao desafio (Máx 5MB por arquivo).
            </p>
            <Button
              variant="secondary"
              type="button"
              onClick={() => attachmentsInputRef.current?.click()}
            >
              📎 Carregar arquivo
            </Button>
            <input
              type="file"
              multiple
              ref={attachmentsInputRef}
              onChange={handleAttachmentsChange}
              className="hidden"
            />
            {selectedAttachmentsNames.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Arquivos selecionados:</p>
                <ul className="list-disc list-inside">
                  {selectedAttachmentsNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-center">
            <Button type="submit">Propor desafio</Button>
          </div>
        </form>
      </div>
    </div>
  );
}