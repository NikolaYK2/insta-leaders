import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/appRoot/services/instaLeadersApiWithReauth'

// Define a service using a base URL and expected endpoints
export const instaLeadersApi = createApi({
  // baseQuery: baseQueryWithReauth,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: () => ({}),
  reducerPath: 'instaLeadersApi',
  tagTypes: ['Auth'],
})
