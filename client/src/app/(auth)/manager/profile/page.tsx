'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

// Componentes da UI
import { NewInput } from '@/components/ui/new-input';
import { NewButton } from '@/components/ui/new-button';
import { NewLabel } from '@/components/ui/new-label';
import { Checkbox } from '@/components/ui/checkbox';
import Title from '@/components/title';
import { Input } from '@/components/ui/input';

// Serviços e Hooks
import {
  updateSchoolManager,
  UpdateSchoolManagerData,
  TeachingStage,
  SchoolManagerData,
} from '@/services/schoolManager.services';
import { useAuth } from '@/hooks/useAuth'; // Assumindo que o hook está em @/hooks/useAuth

// Schema de validação Zod ajustado para edição
const updateFormSchema = z
  .object({
    fullName: z.string().min(3, 'O nome completo deve ter no mínimo 3 caracteres'),
    phoneNumber: z.string().regex(/^\d{10,11}$/, 'O telefone deve ter 10 ou 11 dígitos'),
    email: z.string().email('Endereço de e-mail inválido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').optional().or(z.literal('')),
    confirmPassword: z.string().optional(),
    schoolName: z.string().min(1, 'O nome da escola é obrigatório'),
    teachingStages: z.array(z.nativeEnum(TeachingStage)).min(1, 'Selecione pelo menos uma etapa de ensino'),
    inepCode: z.string().regex(/^\d{8}$/, 'O código INEP deve conter exatamente 8 dígitos'),
    cep: z.string().regex(/^\d{8}$/, 'O CEP deve conter 8 dígitos, sem traço'),
    address: z.string().min(1, 'O endereço é obrigatório'),
    addressNumber: z.string().min(1, 'O número é obrigatório'),
    addressComplement: z.string().optional(),
    image: z.instanceof(FileList).optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    { message: 'As senhas não coincidem', path: ['confirmPassword'] }
  );

type FormData = z.infer<typeof updateFormSchema>;

const teachingStageOptions = [
  { id: TeachingStage.EDUCACAO_INFANTIL, label: 'Educação Infantil' },
  { id: TeachingStage.ENSINO_FUNDAMENTAL_I, label: 'Ensino Fundamental I' },
  { id: TeachingStage.ENSINO_FUNDAMENTAL_II, label: 'Ensino Fundamental II' },
  { id: TeachingStage.ENSINO_MEDIO, label: 'Ensino Médio' },
];

const mockUploadFile = async (file: File): Promise<string> => {
  console.log(`Simulando upload do arquivo: ${file.name}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `https://fake-storage.com/uploads/${Date.now()}-${file.name}`;
};

export default function SchoolManagerProfile() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(updateFormSchema),
  });

  const populateForm = (managerData: SchoolManagerData) => {
    reset({
      fullName: managerData.fullName,
      email: managerData.email,
      phoneNumber: managerData.phoneNumber || '',
      schoolName: managerData.schoolName,
      teachingStages: managerData.teachingStages,
      inepCode: managerData.inepCode,
      cep: managerData.cep,
      address: managerData.address,
      addressNumber: managerData.addressNumber,
      addressComplement: managerData.addressComplement || '',
      password: '',
      confirmPassword: '',
    });
  };

  useEffect(() => {
    if (user && user.type === 'manager') {
      populateForm(user as SchoolManagerData);
    }
  }, [user]);

  const imageFile = watch('image');

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setIsSubmitting(true);
    setError(null);

    try {
      let photoUrl: string | undefined = (user as SchoolManagerData).schoolImageUrl || undefined;
      if (data.image && data.image.length > 0) {
        photoUrl = await mockUploadFile(data.image[0]);
      }

      const payload: UpdateSchoolManagerData = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        schoolName: data.schoolName,
        teachingStages: data.teachingStages,
        inepCode: data.inepCode,
        cep: data.cep,
        address: data.address,
        addressNumber: data.addressNumber,
        addressComplement: data.addressComplement,
        schoolImageUrl: photoUrl,
      };

      if (data.password) {
        payload.password = data.password;
      }

      await updateSchoolManager(user.id, payload);
      alert('Perfil atualizado com sucesso!');
      router.refresh(); // Atualiza a página para buscar novos dados, se necessário
      setIsEditing(false); // Retorna ao modo de visualização
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Ocorreu um erro inesperado.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user && user.type === 'manager') {
      populateForm(user as SchoolManagerData);
    }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando perfil...</div>;
  }

  return (
    <div>
      <Title pageTitle="Meu Perfil" />
      <div className="max-w-7xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold">Informações do gestor escolar</h3>
            <div className="space-y-4 mt-6">
              <div className="space-y-1 w-full">
                <NewLabel htmlFor="fullName">Nome completo</NewLabel>
                <NewInput id="fullName" {...register('fullName')} disabled={!isEditing} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <NewLabel htmlFor="email">E-mail</NewLabel>
                  <NewInput id="email" type="email" {...register('email')} disabled={!isEditing} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <NewLabel htmlFor="phoneNumber">Seu telefone para contato</NewLabel>
                  <NewInput id="phoneNumber" {...register('phoneNumber')} disabled={!isEditing} />
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>
                {isEditing && (
                  <>
                    <div className="space-y-1">
                      <NewLabel htmlFor="password">Nova Senha (opcional)</NewLabel>
                      <NewInput id="password" type="password" placeholder="Deixe em branco para não alterar" {...register('password')} />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <NewLabel htmlFor="confirmPassword">Confirmar Nova Senha</NewLabel>
                      <NewInput id="confirmPassword" type="password" placeholder="Repita a nova senha" {...register('confirmPassword')} />
                      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Informações da escola</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-1 md:col-span-2">
                <NewLabel htmlFor="schoolName">Nome da escola</NewLabel>
                <NewInput id="schoolName" {...register('schoolName')} disabled={!isEditing} />
                {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName.message}</p>}
              </div>
              <div className="space-y-1">
                <NewLabel htmlFor="inepCode">Código INEP</NewLabel>
                <NewInput id="inepCode" {...register('inepCode')} disabled={!isEditing} />
                {errors.inepCode && <p className="text-red-500 text-sm">{errors.inepCode.message}</p>}
              </div>
              <div className="space-y-1">
                <NewLabel htmlFor="cep">CEP</NewLabel>
                <NewInput id="cep" {...register('cep')} disabled={!isEditing} />
                {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
              </div>
              <div className="space-y-1 md:col-span-2">
                <NewLabel htmlFor="address">Endereço</NewLabel>
                <NewInput id="address" {...register('address')} disabled={!isEditing} />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>
              <div className="space-y-1">
                <NewLabel htmlFor="addressNumber">Número</NewLabel>
                <NewInput id="addressNumber" {...register('addressNumber')} disabled={!isEditing} />
                {errors.addressNumber && <p className="text-red-500 text-sm">{errors.addressNumber.message}</p>}
              </div>
              <div className="space-y-1">
                <NewLabel htmlFor="addressComplement">Complemento (opcional)</NewLabel>
                <NewInput id="addressComplement" {...register('addressComplement')} disabled={!isEditing} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <NewLabel>Etapas de Ensino</NewLabel>
                <Controller
                  control={control}
                  name="teachingStages"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border p-4">
                      {teachingStageOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...(field.value || []), option.id])
                                : field.onChange(field.value?.filter((value) => value !== option.id))
                            }
                            disabled={!isEditing}
                          />
                          <label htmlFor={option.id} className={cn('text-sm font-medium leading-none', !isEditing && 'cursor-not-allowed opacity-70')}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.teachingStages && <p className="text-red-500 text-sm">{errors.teachingStages.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <NewLabel className="text-xl font-semibold">Imagem da escola</NewLabel>
            <div className="mt-4">
              {(user as SchoolManagerData)?.schoolImageUrl && !imageFile?.length && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Imagem Atual:</p>
                  <Image
                    src={(user as SchoolManagerData).schoolImageUrl!}
                    alt="Imagem atual da escola"
                    width={200}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <NewLabel
                htmlFor="image-upload"
                className={cn(
                  'flex flex-col items-center bg-white/60 justify-center w-full h-32 px-4 py-6 text-center border border-gray-300 border-dashed rounded-lg text-muted-foreground transition-colors',
                  !isEditing && 'cursor-not-allowed bg-gray-100 opacity-60',
                  isEditing && 'cursor-pointer hover:border-primary hover:text-primary'
                )}
              >
                <UploadCloud className="w-8 h-8" />
                <span className="mt-2 text-sm font-medium">
                  {isEditing ? 'Clique para carregar uma nova imagem' : 'Alterar imagem'}
                </span>
                <span className="mt-1 text-xs">SVG, PNG, JPG</span>
              </NewLabel>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/svg+xml, image/png, image/jpeg"
                {...register('image')}
                disabled={!isEditing}
              />
              {errors.image && <p className="text-red-500 text-sm mt-2">{String(errors.image.message)}</p>}
              {imageFile && imageFile.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <strong>Nova imagem selecionada:</strong> {imageFile[0].name}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <div><span className="font-medium">Falha na atualização:</span> {error}</div>
            </div>
          )}

          <div className="pt-6 flex justify-center gap-4">
            {!isEditing ? (
              <NewButton type="button" onClick={handleEditClick} size={'lg'}>
                Editar Perfil
              </NewButton>
            ) : (
              <>
                <NewButton type="button" variant={'white'} size={'lg'} onClick={handleCancelClick}>
                  Cancelar
                </NewButton>
                <NewButton type="submit" size={'lg'} disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </NewButton>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}