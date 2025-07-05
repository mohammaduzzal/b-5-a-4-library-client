import { z } from "zod";

export const bookSchema = z.object({
    title : z.string(),
    author : z.string(),
    genre : z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn : z.string(),
    description : z.string().optional(),
    copies : z.number().min(1, {message : "copies cannot be less then one"}).int("copies must be an integer")
})

export type BookFormValues = z.infer<typeof bookSchema>