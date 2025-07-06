export interface IBook{
    _id : string
    title : string;
    author : string;
    genre : "FICTION"| "NON_FICTION"| "SCIENCE"| "HISTORY"| "BIOGRAPHY"| "FANTASY";
    isbn : string;
    description :string;
    copies : number;
    available : boolean;

}

export interface IBorrow{
    _id : string;
    book : string;
    quantity : number;
    dueDate : Date;

};



// Add the IBorrowSummary interface
export interface IBorrowSummary {
  book: { // This is an object with book details after aggregation
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}