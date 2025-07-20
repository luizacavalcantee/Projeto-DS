'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, UploadCloud } from 'lucide-react';

import { NewInput } from '@/components/ui/new-input';
import { NewButton } from '@/components/ui/new-button';
import { NewLabel } from '@/components/ui/new-label';
import { Checkbox } from '@/components/ui/checkbox';
import Title from '@/components/title';
import { Input } from '@/components/ui/input';

import {
  createSchoolManager,
  CreateSchoolManagerData,
  TeachingStage
} from '@/services/schoolManager.services';

// Schema de validação Zod que espelha as regras do backend
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'O nome completo deve ter no mínimo 3 caracteres'),
    phoneNumber: z
      .string()
      .regex(
        /^\d{10,11}$/,
        'O telefone deve ter 10 ou 11 dígitos (só números)'
      ),
    email: z.string().email('Endereço de e-mail inválido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
    schoolName: z.string().min(1, 'O nome da escola é obrigatório'),
    teachingStages: z
      .array(z.nativeEnum(TeachingStage))
      .min(1, 'Selecione pelo menos uma etapa de ensino'),
    inepCode: z
      .string()
      .regex(/^\d{8}$/, 'O código INEP deve conter exatamente 8 dígitos'),
    cep: z.string().regex(/^\d{8}$/, 'O CEP deve conter 8 dígitos, sem traço'),
    address: z.string().min(1, 'O endereço é obrigatório'),
    addressNumber: z.string().min(1, 'O número é obrigatório'),
    addressComplement: z.string().optional(),
    image: z.any().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  });

// Tipo do formulário inferido a partir do schema Zod
type FormData = z.infer<typeof formSchema>;

// Opções para os checkboxes de etapas de ensino
const teachingStageOptions = [
  { id: TeachingStage.EDUCACAO_INFANTIL, label: 'Educação Infantil' },
  { id: TeachingStage.ENSINO_FUNDAMENTAL_I, label: 'Ensino Fundamental I' },
  { id: TeachingStage.ENSINO_FUNDAMENTAL_II, label: 'Ensino Fundamental II' },
  { id: TeachingStage.ENSINO_MEDIO, label: 'Ensino Médio' }
];

// Função para simular o upload de um arquivo
const mockUploadFile = async (file: File): Promise<string> => {
  console.log(`Simulando upload do arquivo: ${file.name}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `https://fake-storage.com/uploads/${Date.now()}-${file.name}`;
};

export default function SchoolManagerRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      schoolName: '',
      teachingStages: [],
      inepCode: '',
      cep: '',
      address: '',
      addressNumber: '',
      addressComplement: ''
    }
  });

  const imageFile = watch('image');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      let photoUrl: string | undefined = undefined;
      if (data.image && data.image.length > 0) {
        photoUrl = await mockUploadFile(data.image[0]);
      }

      const payload: CreateSchoolManagerData = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        schoolName: data.schoolName,
        teachingStages: data.teachingStages,
        inepCode: data.inepCode,
        cep: data.cep,
        address: data.address,
        addressNumber: data.addressNumber,
        addressComplement: data.addressComplement,
        schoolImageUrl: photoUrl
      };

      await createSchoolManager(payload);

      alert('Cadastro realizado com sucesso!');
      router.back();
    } catch (err: any) {
      console.error('Erro ao criar o gestor escolar:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Ocorreu um erro inesperado. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Title pageTitle="Cadastro de Gestor escolar" />
      <div className="max-w-7xl mx-auto p-6 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SEÇÃO DE INFORMAÇÕES DO GESTOR */}
          <div>
            <h3 className="text-xl font-semibold">
              Informações do gestor escolar
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Insira primeiro as suas informações como responsável pela escola.
            </p>

            <div className="space-y-4">
              <div className="space-y-1 w-full">
                <NewLabel htmlFor="fullName">Nome completo</NewLabel>
                <NewInput
                  id="fullName"
                  placeholder="Digite seu nome completo"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <NewLabel htmlFor="email">E-mail</NewLabel>
                  <NewInput
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <NewLabel htmlFor="phoneNumber">
                    Seu telefone para contato
                  </NewLabel>
                  <NewInput
                    id="phoneNumber"
                    placeholder="(00) 90000-0000"
                    {...register('phoneNumber')}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <NewLabel htmlFor="password">Senha</NewLabel>
                  <NewInput
                    id="password"
                    type="password"
                    placeholder="Crie uma senha forte"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <NewLabel htmlFor="confirmPassword">Confirmar Senha</NewLabel>
                  <NewInput
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite sua senha novamente"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO DE INFORMAÇÕES DA ESCOLA */}
          <div>
            <h3 className="text-xl font-semibold">Informações da escola</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Agora insira as informações referentes à escola.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1 md:col-span-2">
                <NewLabel htmlFor="schoolName">Nome da escola</NewLabel>
                <NewInput
                  id="schoolName"
                  placeholder="Digite o nome da instituição"
                  {...register('schoolName')}
                />
                {errors.schoolName && (
                  <p className="text-red-500 text-sm">
                    {errors.schoolName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <NewLabel htmlFor="inepCode">Código INEP</NewLabel>
                <NewInput
                  id="inepCode"
                  placeholder="Digite o código de 8 dígitos"
                  {...register('inepCode')}
                />
                {errors.inepCode && (
                  <p className="text-red-500 text-sm">
                    {errors.inepCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <NewLabel htmlFor="cep">CEP</NewLabel>
                <NewInput
                  id="cep"
                  placeholder="Apenas números"
                  {...register('cep')}
                />
                {errors.cep && (
                  <p className="text-red-500 text-sm">{errors.cep.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <NewLabel htmlFor="address">Endereço</NewLabel>
                <NewInput
                  id="address"
                  placeholder="Av. Exemplo, Bairro"
                  {...register('address')}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <NewLabel htmlFor="addressNumber">Número</NewLabel>
                <NewInput
                  id="addressNumber"
                  placeholder="123"
                  {...register('addressNumber')}
                />
                {errors.addressNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.addressNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <NewLabel htmlFor="addressComplement">
                  Complemento (opcional)
                </NewLabel>
                <NewInput
                  id="addressComplement"
                  placeholder="Apto, Bloco, etc."
                  {...register('addressComplement')}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <NewLabel>Etapas de Ensino</NewLabel>
                <Controller
                  control={control} // Passa o controle do formulário
                  name="teachingStages" // O nome do campo no schema Zod
                  render={(
                    { field } // A função render nos dá acesso ao campo
                  ) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border p-4">
                      {teachingStageOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={option.id}
                            // 3. Verificamos se o valor do campo (que é um array) inclui o id da opção
                            checked={field.value?.includes(option.id)}
                            // 4. A mágica acontece aqui!
                            onCheckedChange={(checked) => {
                              // Se for marcado, adicionamos o id ao array.
                              // Se for desmarcado, removemos o id do array.
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== option.id
                                    )
                                  );
                            }}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.teachingStages && (
                  <p className="text-red-500 text-sm">
                    {errors.teachingStages.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO DE UPLOAD DE IMAGEM */}
          <div>
            <NewLabel className="text-xl font-semibold" htmlFor="image-upload">
              Imagem da escola (Opcional)
            </NewLabel>
            <p className="text-sm text-muted-foreground">
              Escolha uma imagem para representar a sua escola.
            </p>
            <div className="mt-4">
              <NewLabel
                htmlFor="image-upload"
                className="flex flex-col items-center bg-white/60 justify-center w-full h-32 px-4 py-6 text-center border border-gray-300 border-dashed rounded-lg cursor-pointer text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <UploadCloud className="w-8 h-8" />
                <span className="mt-2 text-sm font-medium">
                  Clique para fazer upload
                </span>
                <span className="mt-1 text-xs">SVG, PNG, JPG</span>
              </NewLabel>
              <Input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/svg+xml, image/png, image/jpeg"
                {...register('image')}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.image.message}
                </p>
              )}
              {imageFile && imageFile.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <strong>Arquivo selecionado:</strong> {imageFile[0].name}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div
              className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <div>
                <span className="font-medium">Falha no cadastro:</span> {error}
              </div>
            </div>
          )}

          <div className="pt-6 flex justify-center">
            <NewButton
              type="submit"
              className="w-full md:w-96 font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </NewButton>
          </div>
        </form>
      </div>
    </div>
  );
}