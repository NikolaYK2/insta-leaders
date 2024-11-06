import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { GetDevices } from './devices.types'

const SECURITY = 'v1/security'
const deviceService = instaLeadersApi.injectEndpoints({
  endpoints: builder => ({
    getDevices: builder.query<GetDevices, void>({
      providesTags: ['Devices'],
      query: () => ({
        url: `${SECURITY}/devices`,
      }),
    }),

    deleteAllDevices: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: `${SECURITY}/devices`,
      }),
      invalidatesTags: ['Devices'],
    }),
    deleteDeviceById: builder.mutation<void, { deviceId: string }>({
      query: params => ({
        method: 'DELETE',
        url: `${SECURITY}/devices/${params.deviceId}`,
      }),
      invalidatesTags: ['Devices'],
    }),
  }),
})

export const { useGetDevicesQuery, useDeleteAllDevicesMutation, useDeleteDeviceByIdMutation } =
  deviceService
