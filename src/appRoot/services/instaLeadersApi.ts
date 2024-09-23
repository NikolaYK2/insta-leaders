import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const instaLeadersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://main.sociable-people.com/api' }),
  endpoints: () => ({}),
  reducerPath: 'instaLeadersApi',
  tagTypes: ['Auth'],
})
