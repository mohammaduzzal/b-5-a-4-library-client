import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/feature/book/bookApi";
import { bookSchema, type BookFormValues } from "@/schemas/bookSchema";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";




export default function AddBook() {
  
  const form = useForm<BookFormValues>({
    resolver : zodResolver(bookSchema),
    defaultValues :{
      title : "",
      author : "",
      genre : "FICTION",
      isbn : "",
      description : "",
      copies : 0, 
    }
  });
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data : BookFormValues) => {
    const bookData = {
      ...data,
      available: true
    }
   try {
     const res = await createBook(bookData).unwrap();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "book created successfully",
      showConfirmButton: false,
      timer: 1500
    });
    console.log(res);
    form.reset();
    navigate("/")
    
   } catch (error) {
    console.error("Failed to create book:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to create book",
        showConfirmButton: true,
      });
   }
  }


  return (

    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-xl md:text-3xl mb-6 font-bold">Add Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field}  required />
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
                  <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field}  required />
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
                <FormLabel className="mt-1">Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-gray-300 px-3 py-2 rounded-md w-full">
                      <SelectValue placeholder="Select a genre to display" />
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
                  <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field}  required />
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
                  <Textarea className="border border-gray-300 px-3 py-2 rounded-md w-full min-h-[80px]" {...field}/>
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
                  <input type="number" className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field} 
                  onChange={(e)=> field.onChange(parseInt(e.target.value) || 0)}
                   required />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" className="mt-5 px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  )
}
