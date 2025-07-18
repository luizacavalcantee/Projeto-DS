'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription
} from '@/components/ui/alert-dialog';
import { NewButton } from '@/components/ui/new-button';
import { Loader2 } from 'lucide-react';

interface DeleteModalProps {
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteModal({ onConfirm, isDeleting }: DeleteModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <NewButton
          type="button"
          variant={'white'}
          className="w-full"
          disabled={isDeleting}
        >
          Excluir desafio
        </NewButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm text-center p-10">
        <AlertDialogTitle className="text-xl font-bold text-black">
          Excluir Desafio
        </AlertDialogTitle>
        <AlertDialogDescription className="text-base text-muted-foreground mt-2">
          Tem certeza que deseja excluir este desafio? Esta ação não pode ser
          desfeita.
        </AlertDialogDescription>{' '}
        <AlertDialogFooter className="flex-row justify-center gap-4 pt-4">
          <AlertDialogCancel asChild>
            <NewButton variant="white" size={'fit'} className='border-2 border-[#294BB6]'>
              Cancelar
            </NewButton>
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            asChild
          >
            <NewButton size={'fit'} variant="default" className='bg-[#294BB6] hover:bg-[#3E5ED1] text-white'>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Confirmo'
              )}
            </NewButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}