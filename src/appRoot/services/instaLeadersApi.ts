import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/appRoot/services/instaLeadersApiWithReauth'

// Define a service using a base URL and expected endpoints
export const instaLeadersApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'instaLeadersApi',
  tagTypes: ['Auth', 'Profile', 'Post'],
})
