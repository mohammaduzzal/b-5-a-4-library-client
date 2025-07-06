import { z } from "zod";

export const borrowSchema = z.object({

    quantity: z.number(),
    dueDate: z.date()

})

export type BorrowFormValue = z.infer<typeof borrowSchema>