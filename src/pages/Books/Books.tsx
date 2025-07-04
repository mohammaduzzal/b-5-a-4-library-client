import { Button } from "@/components/ui/button";

export default function Books() {
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
        <th>Action</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
   
      {/* row 2 */}
      <tr>
        <th>1</th>
        <td>Happy</td>
        <td>Happy</td>
        <td>HISTORY</td>
        <td>12154</td>
        <td>5</td>
        <td><Button>Edit Book</Button></td>
        <td><Button>Borrow</Button></td>
        <td><Button>Delete</Button></td>
      </tr>
      
      
    </tbody>
  </table>
</div>
  </div>)
}
