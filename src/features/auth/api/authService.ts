import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'

const AUTH = 'v1/auth'
const authService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    //Привер
    // auth: builder.query<void, void>({
    //   query: () => ({
    //     url: `${AUTH}/hello`,
    //   }),
    // }),
  }),
})
//пример
export const {} = authService
