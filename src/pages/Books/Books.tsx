import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/types";


export default function Books() {
  const { data : books, isLoading, isError } = useGetBooksQuery(undefined);

  console.log(books);


  if (isLoading) return <p>Loading.......</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Error: Failed to load books.</p>;
  if(!books || books.length === 0 ){
      return <p className="text-center mt-10">No books found.</p>;
  }


  return (
    <div className="my-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-green-400">
              <th></th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Available</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {

              !isLoading && books.map((book: IBook, idx) =>
                <tr key={book._id}>
                  <th>{idx + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.copies}</td>
                  <td>{book.available ? "Yes" : "No"}</td>
                  <td><Button>Edit Book</Button></td>
                  <td><Button>Borrow</Button></td>
                  <td><Button>Delete</Button></td>
                </tr>
              )
            }


          </tbody>
        </table>
      </div>
    </div>)
}
