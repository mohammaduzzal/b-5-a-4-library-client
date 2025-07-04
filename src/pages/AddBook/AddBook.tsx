import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"




export default function AddBook() {
  const form = useForm()

  const onSubmit = async (data) => {
    console.log(data);
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
              <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field} value={field.value || ""} />
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
              <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field} value={field.value || ""} />
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
              <input className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field} value={field.value || ""} />
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
              <Textarea className="border border-gray-300 px-3 py-2 rounded-md w-full min-h-[80px]" {...field} value={field.value || ""} />
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
              <input type="number" className="border border-gray-300 px-3 py-2 rounded-md w-full" {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />

      <DialogFooter>
        <Button type="submit" className="mt-5 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Save</Button>
      </DialogFooter>
    </form>
  </Form>
</div>
  )
}
