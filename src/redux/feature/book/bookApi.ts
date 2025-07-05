import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const bookApi = createApi({
    reducerPath : "bookApi",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000"}),
    tagTypes : ['book'],
    endpoints : (builder)=>({
        getBooks : builder.query({
            query : ()=> "/books",
            providesTags : ["book"]
        }),
        createBook : builder.mutation({
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