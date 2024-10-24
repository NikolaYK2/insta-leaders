import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { Res } from '@/features/userHub/api/user/userServiceType'
import { Citi, Cities, CitiesParams, Countries } from '@/features/userHub/api/geo/GeoServiceType'

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
    geCity: builder.query<Res<Citi>, { countryCode: string; cityId: string }>({
      query: ({ countryCode, cityId }) => ({
        url: `${GEO}/${countryCode}/cities/${cityId}`,
      }),
    }),
  }),
})

export const { useGetCountriesQuery, useGeCitiesQuery, useGeCityQuery } = geoService
