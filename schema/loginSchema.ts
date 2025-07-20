import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { string } from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: string({ required_error: 'Введите Email' })
      .min(1, 'Введите Email')
      .email('Некорректный Email'),
    password: string({ required_error: 'Введите пароль' })
      .min(1, 'Введите пароль'),
  }),
)
