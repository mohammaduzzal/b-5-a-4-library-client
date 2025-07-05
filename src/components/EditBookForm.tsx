import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Button } from "./ui/button"
import { DialogFooter } from "./ui/dialog"
import Swal from "sweetalert2";
import { useUpdateBookMutation } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/types";
import { useEffect } from "react";
import type { BookFormValues } from "@/schemas/bookSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface EditBookFormProps {
    book: IBook;
    onSuccess: () => void
}

export default function EditBookForm({ book, onSuccess }: EditBookFormProps) {
    const form = useForm<BookFormValues>({
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description || "",
            copies: book.copies,
        },
    });


    useEffect(() => {
        form.reset({
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description || "",
            copies: book.copies,
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book, form.reset])







    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()



    const onSubmit = async (formData: BookFormValues) => {
        try {
            const updateData = {
                _id: book._id,
                ...formData
            }
            await updateBook(updateData).unwrap()

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book updated successfully",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                onSuccess(); // Call parent's success handler to close dialog
            });

        } catch (error) {
            console.error("Failed to update book:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to update book",
            });

        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <input className="border border-gray-300 px-2 py-1 rounded-md w-full" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* author */}
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <input className="border border-gray-300 px-2 py-1 rounded-md w-full" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* select genre */}
                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select  onValueChange={field.onChange} value={field.value}> {/* Use 'value' here */}
                                <FormControl>
                                    <SelectTrigger className="border border-gray-300 px-2 py-1 rounded-md w-full">
                                        <SelectValue  placeholder="Select a genre to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="FICTION">FICTION</SelectItem>
                                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                                    <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                    <SelectItem value="FANTASY">FANTASY</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                {/* isbn */}
                <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Isbn</FormLabel>
                            <FormControl>
                                <input className="border border-gray-300 px-2 py-1 rounded-md w-full" {...field} readOnly/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="border border-gray-300 px-2 py-1 rounded-md w-full min-h-[80px]" {...field} readOnly/>
                            </FormControl>
                        </FormItem>
                    )} />





                {/* copies */}
                <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Copies</FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className="border border-gray-300 px-2 py-1 rounded-md w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-5 px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
