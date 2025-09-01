'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewButton } from '@/components/ui/new-button';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { CheckpointData } from '@/services/challenge.services';
import { updateCheckpoint } from '@/services/checkpoint.services';

interface CheckpointModalProps {
  checkpoint: CheckpointData;
  onUpdateSuccess: () => void;
}

type FormData = {
  description: string;
  photo?: FileList;
};

export default function CheckpointModal({
  checkpoint,
  onUpdateSuccess
}: CheckpointModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await updateCheckpoint(checkpoint.id, {
        description: data.description,
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
      <DialogContent className="max-w-[90%] sm:max-w-md px-4 sm:px-10 py-6 sm:py-10 rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-2 text-center text-lg sm:text-xl">
            {`Como está o "${checkpoint.title}"?`}
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base text-balance">
            Registre a conclusão com uma foto e uma breve descrição de como foi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-6 sm:mt-8">
            <div className="grid gap-2 sm:gap-3">
              <Label htmlFor="description">Descrição do checkpoint</Label>
              <Textarea
                id="description"
                placeholder="Ex: Realizamos a palestra e os alunos adoraram..."
                rows={4}
                {...register('description', { required: true })}
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}
          <DialogFooter className="flex flex-col xs:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <DialogClose asChild className="w-full xs:w-auto">
              <NewButton variant="white" type="button" size={'fit'} className="border-2 border-[#294BB6] w-full xs:w-auto">Cancelar</NewButton>
            </DialogClose>
            <NewButton type="submit" size={'fit'} disabled={isSubmitting} className="bg-[#294BB6] hover:bg-[#3E5ED1] text-white w-full xs:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
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
