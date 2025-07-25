import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { string } from "zod";

export const salesmanSchema = toTypedSchema(
  z.object({
    name: string({ required_error: "Введите Имя" }).min(1, "Введите Имя"),
    tel: string({ required_error: "Введите телефон" }).min(
      1,
      "Введите телефон",
    ),
  }),
);
