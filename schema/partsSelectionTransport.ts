import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const partsSelectionTransport = toTypedSchema(
  z.object({
    transport_brand: z.string({
      required_error: 'Выберите бренд транспорта',
      invalid_type_error: 'Бренд транспорта должен быть числом',
    }),
    transport_model: z.string({
      required_error: 'Укажите модель транспорта',
      invalid_type_error: 'Модель транспорта должна быть строкой',
    }).min(1, 'Укажите модель транспорта'),
    transport_year_production: z.string({
      required_error: 'Укажите год производства',
      invalid_type_error: 'Год должен быть строкой из 4 цифр',
    })
      .regex(/^\d{4}$/, 'Год должен состоять из 4 цифр'),
    transport_serial_number: z.string({
      required_error: 'Укажите серийный номер',
      invalid_type_error: 'Серийный номер должен быть строкой',
    }).min(1, 'Укажите серийный номер'),
    transport_prefix: z.string().optional(),
    engine_brand: z.string().optional(),
    engine_model: z.string().optional(),
    engine_voltage: z.string().optional(),
    engine_fuel_type: z.string().optional(),
    engine_serial_number: z.string().optional(),
    mast_brand: z.string().optional(),
    mast_model: z.string().optional(),
    mast_height: z.number().optional(),
    mast_serial_number: z.string().optional(),
    mast_sections: z.number().optional(),
    mast_cylinders: z.number().optional(),
    text_comment: z.string().optional(),
  }),
)
