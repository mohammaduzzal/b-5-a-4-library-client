import App from "@/App";
import AddBook from "@/pages/AddBook/AddBook";
import Books from "@/pages/Books/Books";
import Borrow from "@/pages/Borrow/Borrow";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : '/',
        Component : App,
        children:[
            {
                
                index : true,
                Component : Books
            },
            {
                path: '/addBook',
                Component : AddBook
            },
            {
                path : '/borrow',
                Component : Borrow
            }
        ]
    }

])

export default router;