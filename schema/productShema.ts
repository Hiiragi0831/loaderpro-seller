import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const productSchema = toTypedSchema(
  z.object({
    product_name: z
      .string({ required_error: "Введите название товара" })
      .min(1, "Введите название товара"),
    brand: z
      .string({ required_error: "Выберите бренд из списка" })
      .min(1, "Выберите бренд из списка"),
    article: z
      .string({ required_error: "Введите артикул" })
      .min(1, "Введите артикул"),
    price: z
      .number({
        invalid_type_error: "Введите корректную цену",
        required_error: "Введите цену",
      })
      .positive("Цена должна быть больше 0"),
    stock: z
      .number({
        invalid_type_error: "Введите корректное количество",
        required_error: "Введите количество",
      })
      .int("Остаток должен быть целым числом")
      .min(0, "Остаток не может быть отрицательным"),
    quality: z
      .string({ required_error: "Введите качество" })
      .min(1, "Введите качество"),
  }),
);
