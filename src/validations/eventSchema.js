import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  date: z.string().refine((val) => {
    if (!val) return false
    return new Date(val) > new Date()
  }, {
    message: "La fecha debe ser en el futuro"
  }),
  venue: z.string().min(1, "El lugar es obligatorio"),
  imageUrl: z.string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")), // permitir vacío
  price: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("El precio no puede ser negativo")
  ),
  isPublished: z.boolean().optional(),
  seatMap: z.object({
    type: z.enum(["ga", "grid"]),
    rows: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Debe haber al menos 1 fila")
    ),
    cols: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Debe haber al menos 1 columna")
    )
  })
})