import { z } from 'zod';

export const User = z.object({
  name: z
    .string({
      invalid_type_error: 'O nome deve ser uma string',
      required_error: 'O nome é obrigatório',
    })
    .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' }),
  phone: z
    .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
    .regex(/^\+?[0-9]+$/, {
      message: 'O número de telefone deve conter apenas números',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Endereço de email inválido' }),
  password: z
    .string({ invalid_type_error: 'A senha deve ser uma string' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

export const UpdateUser = User.partial();
