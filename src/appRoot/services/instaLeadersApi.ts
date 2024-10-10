import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/appRoot/services/instaLeadersApiWithReauth'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

// Define a service using a base URL and expected endpoints
export const instaLeadersApi = createApi({
  // baseQuery: baseQueryWithReauth,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://main.sociable-people.com/api',
    credentials: 'include',
    prepareHeaders: headers => {
      const token = LocalStorageUtil.getValue('accessToken')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'instaLeadersApi',
  tagTypes: ['Auth'],
})
