import type { IBorrow } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowApiResponse{
    data : IBorrow[]
}

interface SingleBorrowApiResponse{
    data : IBorrow
}

export const borrowApi = createApi({
    reducerPath : "borrowApi",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000"}),
    tagTypes : ["borrow"],
    endpoints : (builder) =>({
        getBorrow : builder.query<IBorrow[], void>({
            query : ()=> "/borrow",
            transformResponse : (response : BorrowApiResponse) =>{
                return response.data
            },
            providesTags : ["borrow"]
        }),
        createBorrow : builder.mutation<SingleBorrowApiResponse, Partial<IBorrow>>({
            query : (borrowData) =>({
                url : "/borrow",
                method : "POST",
                body : borrowData
            }),
            invalidatesTags : ["borrow"]
        })
    })
})



export const {useCreateBorrowMutation,useGetBorrowQuery} = borrowApi;