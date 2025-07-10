import { z } from 'zod';
import { ChallengeCategory, TeachingStage, ChallengeStatus } from '@prisma/client';

export const Challenge = z.object({
  title: z
    .string({
      invalid_type_error: 'O título deve ser uma string',
      required_error: 'O título é obrigatório',
    })
    .min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
  
  location: z
    .string({
      invalid_type_error: 'A localização deve ser uma string',
    })
    .optional(),
  
  description: z
    .string({
      invalid_type_error: 'A descrição deve ser uma string',
      required_error: 'A descrição é obrigatória',
    })
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' }),
  
  startDate: z
    .string({
      invalid_type_error: 'A data de início deve ser uma string',
      required_error: 'A data de início é obrigatória',
    })
    .datetime({ message: 'Data de início inválida' })
    .transform((date) => new Date(date)),
  
  endDate: z
    .string({
      invalid_type_error: 'A data de término deve ser uma string',
      required_error: 'A data de término é obrigatória',
    })
    .datetime({ message: 'Data de término inválida' })
    .transform((date) => new Date(date)),
  
  contactName: z
    .string({
      invalid_type_error: 'O nome do contato deve ser uma string',
      required_error: 'O nome do contato é obrigatório',
    })
    .min(3, { message: 'O nome do contato deve ter no mínimo 3 caracteres' }),
  
  contactPhone: z
    .string({
      invalid_type_error: 'O telefone de contato deve ser uma string',
      required_error: 'O telefone de contato é obrigatório',
    })
    .regex(/^\+?[0-9]+$/, {
      message: 'O telefone de contato deve conter apenas números',
    }),
  
  idealAge: z
    .array(
      z.nativeEnum(TeachingStage, {
        invalid_type_error: 'Fase de ensino inválida',
      })
    )
    .min(1, { message: 'Pelo menos uma fase de ensino deve ser selecionada' }),
  
  neededResources: z
    .string({
      invalid_type_error: 'Recursos necessários deve ser uma string',
      required_error: 'Recursos necessários é obrigatório',
    }),
  
  category: z
    .nativeEnum(ChallengeCategory, {
      invalid_type_error: 'Categoria inválida',
      required_error: 'A categoria é obrigatória',
    }),
  
  documentUrls: z
    .array(
      z.string({
        invalid_type_error: 'URL do documento deve ser uma string',
      })
    )
    .optional()
    .default([]),
  
  photoUrl: z
    .string({
      invalid_type_error: 'URL da foto deve ser uma string',
      required_error: 'A URL da foto é obrigatória',
    })
    .url({ message: 'URL da foto inválida' }),
  
  status: z
    .nativeEnum(ChallengeStatus, {
      invalid_type_error: 'Status inválido',
    })
    .optional()
    .default('PENDING'),
  
  ongId: z
    .number({
      invalid_type_error: 'ID da ONG deve ser um número',
      required_error: 'O ID da ONG é obrigatório',
    })
    .positive({ message: 'ID da ONG deve ser um número positivo' }),
  
  managerId: z
    .number({
      invalid_type_error: 'ID do gestor escolar deve ser um número',
      required_error: 'O ID do gestor escolar é obrigatório',
    })
    .positive({ message: 'ID do gestor escolar deve ser um número positivo' }),
});

export const UpdateChallenge = Challenge.partial();
