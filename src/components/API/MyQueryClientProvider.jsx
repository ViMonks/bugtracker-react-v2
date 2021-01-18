/* eslint-disable */
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MyQueryClientProvider({ children }) {
    return(
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}