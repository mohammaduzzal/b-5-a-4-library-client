import BorrowBookForm from "@/components/BorrowBookForm";
import EditBookForm from "@/components/EditBookForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/feature/book/bookApi";
import type { IBook } from "@/types";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Books() {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // State to control the visibility of the edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  // State to hold the data of the book currently being edited
  const [selectedBookToEdit, setSelectedBookToEdit] = useState<IBook | null>(null);

  // State to control the visibility of the borrow dialog
  const [showBorrowDialog, setShowBorrowDialog] = useState(false);
  // State to hold the data of the book currently being borrowed
  const [selectedBookToBorrow, setSelectedBookToBorrow] =
    useState<IBook | null>(null);

  // Function to open the dialog and set the book data(update)
  const handleEditClick = (book: IBook) => {
    setSelectedBookToEdit(book); // Store the full book object
    setShowEditDialog(true);     // Open the dialog
  };
  const handleBorrow = (book: IBook) => {
    setSelectedBookToBorrow(book)
    setShowBorrowDialog(true)
  }



  // console.log(books);

  const handleDelete = (id: string, title: string) => {

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id).unwrap(); // Call the mutation with the book ID
          Swal.fire(
            "Deleted!",
            `"${title}" has been deleted.`,
            "success"
          );
        } catch (err) {
          console.error("Failed to delete book:", err);
          Swal.fire(
            "Error!",
            "error"
          );
        }
      }
    });
  }


  if (isLoading) return <p>Loading.......</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Error: Failed to load books.</p>;
  if (!books || books.length === 0) {
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

              books.map((book: IBook, idx) =>
                <tr key={book._id}>
                  <th>{idx + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.copies}</td>
                  <td>{book.available ? "Yes" : "No"}</td>
                  <td><Button onClick={() => handleEditClick(book)}>Edit Book</Button></td>
                  <td><Button onClick={() => handleBorrow(book)}>Borrow</Button></td>
                  <td><Button onClick={() => handleDelete(book._id, book.title)}>
                    {
                      isDeleting ? 'Deleting...' : 'Delete'
                    }
                  </Button></td>
                </tr>
              )
            }


          </tbody>
        </table>
      </div>


      {/* Edit Book Dialog */}
      {selectedBookToEdit && ( // Only render the dialog if a book is selected for editing
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <EditBookForm
              book={selectedBookToEdit} // Pass the selected book data to the form
              onSuccess={() => {
                setShowEditDialog(false); // Close dialog on success
                setSelectedBookToEdit(null); // Clear selected book state
              }}
            />
          </DialogContent>
        </Dialog>
      )}


       {/* Borrow Book Dialog */}
       {
        selectedBookToBorrow && (
          <Dialog open={showBorrowDialog} onOpenChange={setShowBorrowDialog}>
            <DialogContent>
              <BorrowBookForm book={selectedBookToBorrow}
              onSuccess={()=>{
                setShowBorrowDialog(false)
                setSelectedBookToBorrow(null)
              }}
              />
            </DialogContent>
          </Dialog>
        )
       }
    </div>



  )
}
