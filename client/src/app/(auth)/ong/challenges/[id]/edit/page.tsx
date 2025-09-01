'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, UploadCloud, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Componentes UI
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
import { TeachingStage } from '@/services/schoolManager.services';
import {
  getChallengeById,
  updateChallenge,
  UpdateChallengeData,
  ChallengeCategory,
  ChallengeData,
  deleteChallenge
} from '@/services/challenge.services';
import DeleteModal from '@/components/delete-modal';

type FormData = {
  nomeProjeto: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  idadeIdeal: TeachingStage;
  secretaria: string;
  categoria: ChallengeCategory;
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

export default function EditChallengeOng({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const challengeId = Number(params.id);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // <- Novo estado para a exclusão
  const [error, setError] = useState<string | null>(null);
  const [existingChallenge, setExistingChallenge] =
    useState<ChallengeData | null>(null);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormData>();

  useEffect(() => {
    if (!challengeId) return;
    const fetchChallengeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getChallengeById(challengeId);
        if (data) {
          setExistingChallenge(data);
          reset({
            nomeProjeto: data.title,
            descricao: data.description,
            dataInicio: parseISO(data.startDate),
            dataFim: parseISO(data.endDate),
            idadeIdeal: data.idealAge[0],
            secretaria: data.neededResources,
            categoria: data.category
          });
        } else {
          setError('Desafio não encontrado.');
        }
      } catch (err) {
        setError('Falha ao carregar os dados do desafio.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallengeData();
  }, [challengeId, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload: UpdateChallengeData = {
        title: data.nomeProjeto,
        description: data.descricao,
        startDate: data.dataInicio.toISOString(),
        endDate: data.dataFim.toISOString(),
        idealAge: [data.idadeIdeal],
        neededResources: data.secretaria,
        category: data.categoria
      };
      if (data.anexos && data.anexos.length > 0) {
        payload.documentUrls = await mockUploadMultipleFiles(data.anexos);
      }
      await updateChallenge(challengeId, payload);
      alert('Desafio atualizado com sucesso!');
      router.back();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Ocorreu um erro inesperado.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Nova função para lidar com a exclusão
  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteChallenge(challengeId);
      alert('Desafio excluído com sucesso!');
      router.push('/ong/my-challenges'); // Redireciona para uma página de lista, por exemplo
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Falha ao excluir o desafio.';
      setError(errorMessage);
      // Mantém o usuário na página para ver o erro
    } finally {
      setIsDeleting(false);
    }
  };

  const imageFile = watch('imagem');
  const attachmentFiles = watch('anexos');
  const dataInicio = watch('dataInicio');
  const dataFim = watch('dataFim');
  const idadeIdealValue = watch('idadeIdeal');
  const categoriaValue = watch('categoria');
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: attachmentsRegisterRef, ...attachmentsRegisterRest } =
    register('anexos');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Carregando desafio...</p>
      </div>
    );
  }

  if (error && !existingChallenge) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Desafio não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Title pageTitle="Editar Desafio" />
      <div className="max-w-7xl mx-auto p-6 ">
        <p className="text-2xl font-bold mb-4">
          Edite as Informações do Seu Desafio
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Ajuste os detalhes do desafio proposto para garantir as melhores
          conexões.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="space-y-1">
            <NewLabel>Nome do Desafio</NewLabel>
            <NewInput
              id="nomeProjeto"
              {...register('nomeProjeto')}
              className="border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <NewLabel>Data de Início do Desafio</NewLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dataInicio && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? (
                      format(dataInicio, 'PPP', { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={(date) => setValue('dataInicio', date as Date)}
                    initialFocus
                  />
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
                      'w-full justify-start text-left font-normal',
                      !dataFim && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? (
                      format(dataFim, 'PPP', { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={(date) => setValue('dataFim', date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="descricao">
              Descrição Detalhada do Desafio
            </NewLabel>
            <NewTextarea id="descricao" {...register('descricao')} />
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="idadeIdeal">Idade Ideal dos Alunos</NewLabel>
            <NewSelect
              onValueChange={(value: TeachingStage) =>
                setValue('idadeIdeal', value)
              }
              value={idadeIdealValue}
            >
              <NewSelectTrigger id="idadeIdeal">
                <NewSelectValue />
              </NewSelectTrigger>
              <NewSelectContent className="z-50 bg-white shadow-lg">
                <NewSelectItem value={TeachingStage.EDUCACAO_INFANTIL}>
                  Educação Infantil
                </NewSelectItem>
                <NewSelectItem value={TeachingStage.ENSINO_FUNDAMENTAL_I}>
                  Ensino Fundamental 1
                </NewSelectItem>
                <NewSelectItem value={TeachingStage.ENSINO_FUNDAMENTAL_II}>
                  Ensino Fundamental 2
                </NewSelectItem>
                <NewSelectItem value={TeachingStage.ENSINO_MEDIO}>
                  Ensino Médio
                </NewSelectItem>
              </NewSelectContent>
            </NewSelect>
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="secretaria">Recursos Necessários</NewLabel>
            <NewInput id="secretaria" {...register('secretaria')} />
          </div>

          <div className="space-y-1">
            <NewLabel htmlFor="categoria">Categoria do Desafio</NewLabel>
            <NewSelect
              onValueChange={(value: ChallengeCategory) =>
                setValue('categoria', value)
              }
              value={categoriaValue}
            >
              <NewSelectTrigger id="categoria">
                <NewSelectValue />
              </NewSelectTrigger>
              <NewSelectContent className="z-50 bg-white shadow-lg">
                {Object.values(ChallengeCategory).map((cat) => (
                  <NewSelectItem key={cat} value={cat}>
                    {cat.replace(/_/g, ' ').charAt(0).toUpperCase() +
                      cat.replace(/_/g, ' ').slice(1).toLowerCase()}
                  </NewSelectItem>
                ))}
              </NewSelectContent>
            </NewSelect>
          </div>

          <div>
            <Input
              id="file-attachments"
              type="file"
              className="hidden"
              multiple
              {...attachmentsRegisterRest}
              ref={(e) => {
                attachmentsRegisterRef(e);
                attachmentsInputRef.current = e;
              }}
            />
            <NewButton
              variant={'lightBlue'}
              size={'lg'}
              type="button"
              onClick={() => attachmentsInputRef.current?.click()}
              className="flex items-center justify-center gap-2"
            >
              <Image src={Upload} alt="Upload Icon" />
              <span className="text-white">Carregar novo(s) arquivo(s)</span>
            </NewButton>
            {attachmentFiles && attachmentFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-semibold">
                  Novos arquivos selecionados:
                </p>
                <ul className="list-disc list-inside text-sm">
                  {Array.from(attachmentFiles).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {error && (
            <div
              className="flex items-center p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <div>
                <span className="font-medium">Ocorreu um erro:</span> {error}
              </div>
            </div>
          )}

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <NewButton
              type="submit"
              className="w-full"
              disabled={isSubmitting || isDeleting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </NewButton>

            {/* ✅ Passando a função e o estado de exclusão para o modal */}
            <DeleteModal onConfirm={handleDelete} isDeleting={isDeleting} />
          </div>
        </form>
      </div>
    </div>
  );
}
