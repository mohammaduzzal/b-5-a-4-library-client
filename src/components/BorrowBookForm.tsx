import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { DialogFooter } from "./ui/dialog"
import type { IBook } from "@/types"
import type { BorrowFormValue } from "@/schemas/borrowSchema"
import { useCreateBorrowMutation } from "@/redux/feature/borrow/borrowApi"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"

interface BorrowBookProps {
    book: IBook;
    onSuccess: () => void
}



export default function BorrowBookForm({ book, onSuccess }: BorrowBookProps) {
    const form = useForm<BorrowFormValue>({
        defaultValues : {
            quantity : 1,
            dueDate : new Date()
        }
    });

    const [createBorrow] = useCreateBorrowMutation();
    const navigate = useNavigate()

    const onSubmit = async (borrowData: BorrowFormValue) => {

        if(borrowData.quantity > book.copies){
            form.setError("quantity", {
                type : "manual",
                message : `Quantity cannot exceed available copies (${book.copies}).`
            })
            return;
        }
        const broData = {
            book: book._id,
            ...borrowData
        }
        try {
            const res = await createBorrow(broData).unwrap();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "book borrowed successfully",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(res);
            form.reset();
            navigate("/borrow")
            onSuccess()

        } catch (error) {
            console.error("Failed to create borrow:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to  borrow",
                showConfirmButton: false,
                timer: 1500
            });

        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* quantity */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>quantity</FormLabel>
                            <FormControl>
                                <input type="number" className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)
                                    
                                    }
                                min={1}
                                max={book.copies}
                                    required />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* date picker */}
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="mt-1">Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        // disabled={(date) =>
                                        //     date > new Date() || date < new Date("1900-01-01")
                                        // }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />


                <DialogFooter>
                    <Button type="submit" className="mt-5">Borrow</Button>
                </DialogFooter>
            </form>

        </Form>
    )
}
