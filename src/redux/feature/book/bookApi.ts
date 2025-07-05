import type { IBook } from "@/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

interface BooksApiResponse {
    data : IBook[]
}

interface SingleBookApiResponse {
    data : IBook
}

export const bookApi = createApi({
    reducerPath : "bookApi",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000"}),
    tagTypes : ['book'],
    endpoints : (builder)=>({
        getBooks : builder.query<IBook[],void>({
            query : ()=> "/books",
            transformResponse : (response : BooksApiResponse) =>{
                return response.data
            },
            providesTags : ["book"]
        }),
        createBook : builder.mutation<SingleBookApiResponse, Partial<IBook>>({
            query : (bookData)=>({
                url: "/books",
                method : "POST",
                body : bookData
            }),
            invalidatesTags : ["book"]
        })
    })
})


export const {useGetBooksQuery, useCreateBookMutation} = bookApi;