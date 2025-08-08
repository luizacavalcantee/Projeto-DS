import { z } from 'zod';
import { TeachingStage } from '@prisma/client';

export const CreateSchoolManager = z.object({
  fullName: z
    .string({
      invalid_type_error: 'O nome completo deve ser uma string',
      required_error: 'O nome completo é obrigatório',
    })
    .min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres' }),

  phoneNumber: z
    .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
    .regex(/^\d{10,11}$/, {
      message: 'O número de telefone deve ter 10 ou 11 dígitos (DDD + número)',
    })
    .optional(),

  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Endereço de e-mail inválido' }),

  password: z
    .string({
      invalid_type_error: 'A senha deve ser uma string',
      required_error: 'A senha é obrigatória',
    })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),

  schoolName: z.string({
    invalid_type_error: 'O nome da escola deve ser uma string',
    required_error: 'O nome da escola é obrigatório',
  }),

  teachingStages: z
    .array(z.nativeEnum(TeachingStage), {
      invalid_type_error: 'As etapas de ensino devem ser um array',
      required_error: 'As etapas de ensino são obrigatórias',
    })
    .min(1, { message: 'Selecione ao menos uma etapa de ensino' }),

  inepCode: z
    .string({
      invalid_type_error: 'O código INEP deve ser uma string',
      required_error: 'O código INEP é obrigatório',
    })
    .regex(/^\d{8}$/, {
      message: 'O código INEP deve conter exatamente 8 dígitos',
    }),

  cep: z
    .string({
      invalid_type_error: 'O CEP deve ser uma string',
      required_error: 'O CEP é obrigatório',
    })
    .regex(/^\d{8}$/, { message: 'O CEP deve conter 8 dígitos, sem traço' }),

  address: z.string({
    invalid_type_error: 'O endereço deve ser uma string',
    required_error: 'O endereço é obrigatório',
  }),

  addressNumber: z.string({
    invalid_type_error: 'O número do endereço deve ser uma string',
    required_error: 'O número do endereço é obrigatório',
  }),

  addressComplement: z.string().optional(),

  schoolImageUrl: z
    .string({ invalid_type_error: 'A URL da imagem deve ser uma string' })
    .url({ message: 'A URL da imagem da escola é inválida' })
    .optional(),
});

export const UpdateSchoolManager = CreateSchoolManager.partial();

export type CreateSchoolManagerDTO = z.infer<typeof CreateSchoolManager>;
export type UpdateSchoolManagerDTO = z.infer<typeof UpdateSchoolManager>;
