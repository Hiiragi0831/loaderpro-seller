import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const querySchema = toTypedSchema(
  z.object({
    brand: z.string({ required_error: 'Выберите бренд' }).min(1, 'Выберите бренд'),
    num_parts: z
      .string({ required_error: 'Введите номер запчасти' })
      .min(1, 'Введите номер запчасти'),
    count: z
      .number({ required_error: 'Укажите количество', invalid_type_error: 'Введите число' })
      .min(1, 'Количество должно быть больше 0'),
  }),
)
