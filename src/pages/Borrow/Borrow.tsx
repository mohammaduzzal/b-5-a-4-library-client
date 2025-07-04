
export default function Borrow() {
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
   
      {/* row 2 */}
      <tr>
        <th>1</th>
        <td>Happy</td>
        <td>12154</td>
        <td>5</td>
      
      </tr>
      
      
    </tbody>
  </table>
</div>
  </div>
  )
}
