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
    baseQuery : fetchBaseQuery({baseUrl : "https://assignment-4-server-phi.vercel.app"}),
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
        }),
        updateBook : builder.mutation<SingleBookApiResponse, Partial<IBook>, Pick<IBook, '_id'>>({
            query : ({_id, ...patch})=>({
                url : `/books/${_id}`,
                method : "PATCH",
                body : patch
            }),
            invalidatesTags : ["book"]
        })
        ,
        deleteBook : builder.mutation<void, string>({
            query : (id)=>({
                url : `/books/${id}`,
                method : "DELETE",
            }),
            invalidatesTags : ["book"]
        })
    })
})


export const {useGetBooksQuery, useCreateBookMutation,useDeleteBookMutation,useUpdateBookMutation} = bookApi;