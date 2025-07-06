import { useGetBorrowQuery } from "@/redux/feature/borrow/borrowApi"

interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export default function Borrow() {
  const {data : borrows, isLoading,isError} = useGetBorrowQuery(undefined)

  // console.log(borrows);

  if (isLoading) return <p>Loading.......</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Error: Failed to load books.</p>;
  if (!borrows || borrows.length === 0) {
    return <p className="text-center mt-10">No borrowed book found.</p>;
  }


  return (
      <div className="w-5/12 mx-auto my-10">
        <h1 className="text-center text-xl md:text-3xl text-green-400 my-5">Borrow Summary</h1>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-green-400">
        <th></th>
        <th>Book Name</th>
        <th>ISBN</th>
        <th>Total Quantity Borrowed</th>
      </tr>
    </thead>
    <tbody>
   
 {borrows.map((borrow: IBorrowSummary, idx) => (
  
    <tr key={idx}><th>{idx + 1}</th>
    <td>{borrow.book.title}</td> 
    <td>{borrow.book.isbn}</td> 
    <td>{borrow.totalQuantity}</td></tr> 
  
))}
    
      
      
    </tbody>
  </table>
</div>
  </div>
  )
}
