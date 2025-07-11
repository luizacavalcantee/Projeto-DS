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

export function DeleteModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
            <NewButton
              type="submit"
              variant={'white'}
              size={'fit'}
              className="min-w-96 font-medium"
            >
              Excluir desafio
            </NewButton>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm text-center p-10">
        <AlertDialogTitle className="text-lg font-semibold text-black mb-2">
          Tem certeza que você deseja excluir esse desafio?
        </AlertDialogTitle>

        <AlertDialogFooter className="flex justify-start gap-4" >
          <AlertDialogAction asChild>
            <NewButton className="bg-[#294BB6] hover:bg-[#3E5ED1] text-white" size={"fit"} variant="default">
              Confirmo
            </NewButton>
          </AlertDialogAction>

          <AlertDialogCancel asChild>
            <NewButton variant="white" size={"fit"}>
              Cancelar
            </NewButton>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
