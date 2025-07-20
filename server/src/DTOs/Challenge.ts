import { z } from 'zod';
import { TeachingStage, ChallengeCategory } from '@prisma/client';

export const CreateChallenge = z.object({
  title: z
    .string({
      invalid_type_error: 'O título deve ser uma string',
      required_error: 'O título é obrigatório',
    })
    .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),

  location: z
    .string({ invalid_type_error: 'A localização deve ser uma string' })
    .optional(),

  description: z
    .string({
      invalid_type_error: 'A descrição deve ser uma string',
      required_error: 'A descrição é obrigatória',
    })
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' }),

  startDate: z.coerce.date({
    invalid_type_error: 'A data de início deve ser uma data válida',
    required_error: 'A data de início é obrigatória',
  }),

  endDate: z.coerce.date({
    invalid_type_error: 'A data de término deve ser uma data válida',
    required_error: 'A data de término é obrigatória',
  }),

  idealAge: z
    .array(z.nativeEnum(TeachingStage), {
      invalid_type_error: 'A idade ideal (etapa de ensino) deve ser um array',
      required_error: 'A idade ideal é obrigatória',
    })
    .min(1, { message: 'Selecione ao menos uma etapa de ensino' }),

  neededResources: z.string({
    invalid_type_error: 'Os recursos necessários devem ser uma string',
    required_error: 'Os recursos necessários são obrigatórios',
  }),

  category: z.nativeEnum(ChallengeCategory, {
    errorMap: () => ({ message: 'Selecione uma categoria válida' }),
  }),
  
  documentUrls: z
    .array(z.string().url({ message: 'URL de documento inválida' }))
    .optional(),

  ongId: z.number({
    invalid_type_error: 'O ID da ONG deve ser um número',
    required_error: 'O ID da ONG é obrigatório',
  }).int().positive(),

  managerId: z.number({
    invalid_type_error: 'O ID do gestor deve ser um número',
    required_error: 'O ID do gestor é obrigatório',
  }).int().positive().optional(),

  // Campos para a criação inicial dos checkpoints
  checkpoint1Title: z.string({ required_error: 'O título do checkpoint 1 é obrigatório' }),
  checkpoint2Title: z.string({ required_error: 'O título do checkpoint 2 é obrigatório' }),
  checkpoint3Title: z.string({ required_error: 'O título do checkpoint 3 é obrigatório' }),
});

export const UpdateChallenge = CreateChallenge.partial();

export type CreateChallengeDTO = z.infer<typeof CreateChallenge>;
export type UpdateChallengeDTO = z.infer<typeof UpdateChallenge>;