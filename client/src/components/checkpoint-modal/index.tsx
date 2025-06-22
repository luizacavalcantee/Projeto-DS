interface ComponentsProps {
    buttonText?: string;
}
import { Button } from '@/components/ui/new-button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Nuvem } from "@/assets"
import Image from 'next/image';

export default function CheckpointModal({
    buttonText
}: ComponentsProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">{buttonText}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-1/3 sm:max-h-1/3 px-[40px] py-[40px]">
                    <DialogHeader>
                        <DialogTitle className="mb-2 text-center">Como está o andamento do seu projeto?</DialogTitle>
                        <DialogDescription className="text-center">
                            Já conseguiu concluir o Checkpoint? Registre com uma foto e uma breve descrição como foi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mt-[32px]">
                        <div className="grid gap-3">
                            <Label htmlFor="description">Descrição do checkpoint</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Digite aqui"
                                rows={4}
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="relative">
                                <Input
                                    id="file-upload"
                                    type="file"
                                    className="absolute inset-0 opacity-0 w-full h-[74px] cursor-pointer z-10"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-[74px] border-dashed border-2 bg-transparent"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-2">
                                            <Image src={Nuvem} alt="Upload" className="h-5 w-5" />
                                            <span>Clique para fazer upload</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-[32px]">
                        <Button
                            type="submit"
                            className="w-full">
                            Salvar Checkpoint</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}