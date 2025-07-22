// src/components/checkpoint-modal.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewButton } from '@/components/ui/new-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Nuvem } from '@/assets';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { CheckpointData } from '@/services/challenge.services';
import { updateCheckpoint } from '@/services/checkpoint.services';

const mockUploadFile = async (file: File): Promise<string> => {
  console.log(`Simulando upload do arquivo: ${file.name}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `https://fake-storage.com/uploads/photo-${file.name}`;
};

interface CheckpointModalProps {
  checkpoint: CheckpointData;
  onUpdateSuccess: () => void;
}

type FormData = {
  description: string;
  photo: FileList;
};

export default function CheckpointModal({
  checkpoint,
  onUpdateSuccess
}: CheckpointModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<FormData>();

  const selectedFile = watch('photo');

  const onSubmit = async (data: FormData) => {
     if (!data.photo || data.photo.length === 0) {
      setError('Por favor, selecione uma foto para o checkpoint.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const photoUrl = await mockUploadFile(data.photo[0]);

      await updateCheckpoint(checkpoint.id, {
        description: data.description,
        photoUrl: photoUrl,
        completionDate: new Date().toISOString()
      });

      alert('Checkpoint salvo com sucesso!');
      onUpdateSuccess();
    } catch (err: any) {
      setError(err.message || 'Falha ao salvar o checkpoint.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <NewButton variant={'lightBlue'} size={'sm'} className="mt-2">
          Adicionar checkpoint
        </NewButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md px-10 py-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-xl">
            {`Como está o "${checkpoint.title}"?`}
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            Registre a conclusão com uma foto e uma breve descrição de como foi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição do checkpoint</Label>
              <Textarea
                id="description"
                placeholder="Ex: Realizamos a palestra e os alunos adoraram..."
                rows={4}
                {...register('description', { required: true })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="file-upload">Faça upload de uma foto</Label>
              <div className="relative">
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  {...register('photo', { required: true })}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-[74px] w-full border-2 border-dashed bg-transparent"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Image src={Nuvem} alt="Upload" className="h-5 w-5" />
                      <span>
                        {selectedFile && selectedFile.length > 0
                          ? selectedFile[0].name
                          : 'Clique para fazer upload'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">SVG, PNG, JPG</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <NewButton type="button" size={'fit'}>Cancelar</NewButton>
            </DialogClose>
            <NewButton type="submit" size={'fit'} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Salvar Checkpoint'
              )}
            </NewButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
