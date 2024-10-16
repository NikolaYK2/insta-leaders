import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Res } from '@/features/userHub/api/user/userServiceType'
import { Cities, CitiesParams, Countries } from '@/features/userHub/api/geo/GeoServiceType'

const GEO = 'v1/geo/countries'
const geoService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<Res<Countries>, void>({
      query: () => ({
        url: GEO,
      }),
    }),
    geCities: builder.query<Res<Cities>, CitiesParams>({
      query: ({ countryCode, ...params }) => ({
        params: params,
        url: `${GEO}/${countryCode}/cities`,
      }),
    }),
  }),
})

export const { useGetCountriesQuery, useGeCitiesQuery } = geoService
