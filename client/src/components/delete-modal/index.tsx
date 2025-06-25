'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

import { NewButton } from "@/components/ui/new-button"

interface DeleteModalProps {
  children: React.ReactNode
  onConfirm: () => void
}

export function DeleteModal({ children, onConfirm }: DeleteModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm text-center">
        <AlertDialogTitle className="text-base font-medium text-black">
          Tem certeza que você deseja excluir esse desafio?
        </AlertDialogTitle>

        <AlertDialogFooter className="flex justify-start gap-4  " >
          <AlertDialogAction asChild>
            <NewButton className="w-[150px] h-[30px] bg-[#294BB6] hover:bg-[#3E5ED1] text-white" variant="default" onClick={onConfirm}  >
              Confirmo
            </NewButton>
          </AlertDialogAction>

          <AlertDialogCancel asChild>
            <NewButton className="w-[150px] h-[30px]" variant="white">
              Cancelar
            </NewButton>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
