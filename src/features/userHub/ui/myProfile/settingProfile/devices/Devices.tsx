import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'

import { NextPageWithLayout } from '@/pages/_app'

import { Card, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { useGetDevicesQuery } from '@/features/userHub/api/devices/devices'
import { Device } from '@/features/userHub/api/devices/devices.types'

export const DeviceComponent = () => {
  const { data, error, isLoading } = useGetDevicesQuery()

  return (
    <Page titleMeta={'Devices'} descriptionMeta={'devices'} className={'pt-0'}>
      {/* <section className={'flex justify-between flex-wrap mt-[3.04%]'}>
        <Typography variant={TypographyVariant.h3} className="text-light-100">
          Current device
        </Typography>
        <Card>
          <DynamicIcon iconId="GoogleSvgrepoCom1" width={36} height={36} />
          <Typography variant={TypographyVariant.bold_text_16} className="text-light-100">
            Google
          </Typography> */}
      {/* <Typography variant={TypographyVariant.regular_text_14} className="text-light-100"> */}
      {data?.data.map(device => (
        <div key={device.deviceId}>
          <p>IP: {device.ip}</p>
          <p>Title: {device.title}</p>
          <p>Last Active Date: {device.lastActiveDate}</p>
        </div>
      ))}
      {/* </Typography>
        </Card>
      </section> */}
    </Page>
  )
}

// export const Devices: NextPageWithLayout = () => {
//   return (
//     <Page titleMeta={'Devices'} descriptionMeta={'devices'} className={'pt-0'}>
//       <section className={'flex justify-between flex-wrap mt-[3.04%]'}>
//         <DeviceComponent
//           device={{
//             ip: '',
//             title: '',
//             lastActiveDate: '',
//             deviceId: '',
//           }}
//         />
//       </section>
//     </Page>
//   )
// }
