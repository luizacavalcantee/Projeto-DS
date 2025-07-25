'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, AlertCircle } from 'lucide-react';
import Image from 'next/image';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Upload } from '@/assets';
import { cn } from '@/lib/utils';

import { createChallenge, CreateChallengeData, ChallengeCategory } from '@/services/challenge.services';
import { TeachingStage } from '@/services/schoolManager.services';
import { useAuth } from '@/hooks/useAuth';

type FormData = {
  nomeProjeto: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  idadeIdeal: TeachingStage;
  secretaria: string;
  categoria: ChallengeCategory;
  tituloCheckpoint1: string;
  tituloCheckpoint2: string;
  tituloCheckpoint3: string;
  imagem?: FileList;
  anexos?: FileList;
};

const mockUploadFile = async (file: File): Promise<string> => {
  console.log(`Simulando upload do arquivo: ${file.name}`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); 
  return `https://fake-storage.com/uploads/${Date.now()}-${file.name}`;
};

const mockUploadMultipleFiles = async (files: FileList): Promise<string[]> => {
  console.log(`Simulando upload de ${files.length} arquivos.`);
  const uploadPromises = Array.from(files).map((file) => mockUploadFile(file));
  return await Promise.all(uploadPromises);
};

export default function CreateChallenge() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const attachmentFiles = watch('anexos');
  const dataInicio = watch('dataInicio');
  const dataFim = watch('dataFim');
  const idadeIdealValue = watch('idadeIdeal');
  const categoriaValue = watch('categoria');

  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: attachmentsRegisterRef, ...attachmentsRegisterRest } = register('anexos');

  const onSubmit = async (data: FormData) => {
    if (!user || user.type !== 'ong') {
        setError('Acesso negado. Você precisa estar logado como uma ONG para criar um desafio.');
        return;
    }

    if (!data.dataInicio || !data.dataFim || !data.idadeIdeal || !data.categoria) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let documentUrls: string[] = [];
      if (data.anexos && data.anexos.length > 0) {
        documentUrls = await mockUploadMultipleFiles(data.anexos);
      }

      const payload: CreateChallengeData = {
        title: data.nomeProjeto,
        description: data.descricao,
        startDate: data.dataInicio.toISOString(),
        endDate: data.dataFim.toISOString(),
        idealAge: [data.idadeIdeal],
        neededResources: data.secretaria,
        category: data.categoria,
        documentUrls: documentUrls,
        checkpoint1Title: data.tituloCheckpoint1,
        checkpoint2Title: data.tituloCheckpoint2,
        checkpoint3Title: data.tituloCheckpoint3,
        ongId: user.id
      };

      console.log(payload)

      // 3. Chamar a API através do serviço
      const newChallenge = await createChallenge(payload);
      console.log('Desafio criado com sucesso:', newChallenge);
      
      // 4. Lógica de sucesso (ex: mostrar notificação e redirecionar)
      alert('Desafio proposto com sucesso!');
      router.push('/ong/challenges'); // Exemplo de rota de redirecionamento

    } catch (err: any) {
      console.error('Erro ao criar o desafio:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Ocorreu um erro inesperado. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
          <div className="space-y-1">
            <NewLabel>Nome do Desafio</NewLabel>
            <NewInput
              id="nomeProjeto"
              placeholder="Digite o nome do projeto"
              {...register('nomeProjeto', { required: 'O nome do desafio é obrigatório' })}
              className="border"
            />
            {errors.nomeProjeto && <p className="text-red-500 text-sm">{errors.nomeProjeto.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {dataInicio ? format(dataInicio, 'PPP', { locale: ptBR }) : <span>Selecione a data de início</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dataInicio} onSelect={(date) => setValue('dataInicio', date as Date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
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
                    {dataFim ? format(dataFim, 'PPP', { locale: ptBR }) : <span>Selecione a data final</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dataFim} onSelect={(date) => setValue('dataFim', date as Date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="descricao">Descrição Detalhada do Desafio</NewLabel>
            <NewTextarea
              id="descricao"
              placeholder="Descreva os detalhes do desafio proposto"
              {...register('descricao', { required: 'A descrição é obrigatória' })}
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
          </div>
          
          <div className="space-y-1">
             <NewLabel htmlFor="idadeIdeal">Idade Ideal dos Alunos</NewLabel>
             <NewSelect onValueChange={(value: TeachingStage) => setValue('idadeIdeal', value)} value={idadeIdealValue}>
               <NewSelectTrigger id="idadeIdeal"><NewSelectValue placeholder="Selecione nível de ensino ideal" /></NewSelectTrigger>
               <NewSelectContent className="z-50 bg-white shadow-lg">
                 <NewSelectItem value={TeachingStage.EDUCACAO_INFANTIL}>Educação Infantil</NewSelectItem>
                 <NewSelectItem value={TeachingStage.ENSINO_FUNDAMENTAL_I}>Ensino Fundamental 1</NewSelectItem>
                 <NewSelectItem value={TeachingStage.ENSINO_FUNDAMENTAL_II}>Ensino Fundamental 2</NewSelectItem>
                 <NewSelectItem value={TeachingStage.ENSINO_MEDIO}>Ensino Médio</NewSelectItem>
               </NewSelectContent>
             </NewSelect>
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="secretaria">Recursos Necessários</NewLabel>
            <NewInput
              id="secretaria"
              placeholder="Cite os recursos necessários para executar o desafio"
              {...register('secretaria', { required: 'Os recursos são obrigatórios' })}
            />
            {errors.secretaria && <p className="text-red-500 text-sm">{errors.secretaria.message}</p>}
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="categoria">Categoria do Desafio</NewLabel>
            <NewSelect onValueChange={(value: ChallengeCategory) => setValue('categoria', value)} value={categoriaValue}>
              <NewSelectTrigger id="categoria"><NewSelectValue placeholder="Selecione a categoria" /></NewSelectTrigger>
              <NewSelectContent className="z-50 bg-white shadow-lg">
                {Object.values(ChallengeCategory).map((cat) => (
                  <NewSelectItem key={cat} value={cat}>
                    {cat.replace(/_/g, ' ').charAt(0).toUpperCase() + cat.replace(/_/g, ' ').slice(1).toLowerCase()}
                  </NewSelectItem>
                ))}
              </NewSelectContent>
            </NewSelect>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Informações para o acompanhamento do desafio</h3>
            <p className="text-sm text-muted-foreground">
              Para ser possível acompanhar o andamento do seu desafio é necessário que você divida esse desafio em 3 etapas e dê um título para cada uma delas.
            </p>
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint1">Título do checkpoint 1</NewLabel>
            <NewInput
              id="tituloCheckpoint1"
              placeholder="Título da primeira etapa"
              {...register('tituloCheckpoint1', { required: 'O título do checkpoint 1 é obrigatório' })}
            />
            {errors.tituloCheckpoint1 && <p className="text-red-500 text-sm">{errors.tituloCheckpoint1.message}</p>}
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint2">Título do checkpoint 2</NewLabel>
            <NewInput
              id="tituloCheckpoint2"
              placeholder="Título da segunda etapa"
              {...register('tituloCheckpoint2', { required: 'O título do checkpoint 2 é obrigatório' })}
            />
            {errors.tituloCheckpoint2 && <p className="text-red-500 text-sm">{errors.tituloCheckpoint2.message}</p>}
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="tituloCheckpoint3">Título do checkpoint 3</NewLabel>
            <NewInput
              id="tituloCheckpoint3"
              placeholder="Título da terceira etapa"
              {...register('tituloCheckpoint3', { required: 'O título do checkpoint 3 é obrigatório' })}
            />
            {errors.tituloCheckpoint3 && <p className="text-red-500 text-sm">{errors.tituloCheckpoint3.message}</p>}
          </div>
                    
          <div className="space-y-2 pt-4">
            <NewLabel className="text-xl font-semibold">Anexar arquivos</NewLabel>
            <p className="text-sm text-muted-foreground">Anexe documentos relevantes referente ao desafio. (Max: 5MB por arquivo).</p>
          </div>
          <div>
            <Input id="file-attachments" type="file" className="hidden" multiple {...attachmentsRegisterRest} ref={(e) => { attachmentsRegisterRef(e); attachmentsInputRef.current = e; }} />
            <NewButton variant={'lightBlue'} size={'lg'} type="button" onClick={() => attachmentsInputRef.current?.click()} className="flex items-center justify-center gap-2">
              <Image src={Upload} alt="Upload Icon" />
              <span className="text-white">Carregar arquivo(s)</span>
            </NewButton>
            {attachmentFiles && attachmentFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-semibold">Arquivos selecionados:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {Array.from(attachmentFiles).map((file, index) => (<li key={index}>{file.name}</li>))}
                </ul>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <div><span className="font-medium">Falha ao propor desafio:</span> {error}</div>
            </div>
          )}

          <div className="pt-6 flex justify-center">
            <NewButton type="submit" className="min-w-96 font-medium" disabled={isLoading}>
              {isLoading ? 'Propondo desafio...' : 'Propor desafio'}
            </NewButton>
          </div>
        </form>
      </div>
    </div>
  );
}