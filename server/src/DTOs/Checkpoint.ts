import { z } from 'zod';

export const UpdateCheckpoint = z.object({
  description: z
    .string({
      invalid_type_error: 'A descrição deve ser uma string',
    })
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
    .optional(),

  photoUrl: z
    .string({ invalid_type_error: 'A URL da foto deve ser uma string' })
    .url({ message: 'URL da foto inválida' })
    .optional(),
    
  completionDate: z.coerce.date({
    invalid_type_error: 'A data de conclusão deve ser uma data válida',
  }).optional(),
});

export type UpdateCheckpointDTO = z.infer<typeof UpdateCheckpoint>;