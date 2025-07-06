import type { IBorrow, IBorrowSummary } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface BorrowApiResponse{
//     data : IBorrow[]
// }

interface BorrowSummaryApiResponse {
    data : IBorrowSummary[]
}

interface SingleBorrowApiResponse{
    data : IBorrow
}

export const borrowApi = createApi({
    reducerPath : "borrowApi",
    baseQuery : fetchBaseQuery({baseUrl : "https://assignment-4-server-phi.vercel.app"}),
    tagTypes : ["borrow"],
    endpoints : (builder) =>({
        getBorrow : builder.query<IBorrowSummary[], void>({
            query : ()=> "/borrow",
            transformResponse : (response : BorrowSummaryApiResponse) =>{
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