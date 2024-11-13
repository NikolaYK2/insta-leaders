import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'

import { NextPageWithLayout } from '@/pages/_app'

import { Card, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { useGetDevicesQuery } from '@/features/userHub/api/devices/devices'
import { Device } from '@/features/userHub/api/devices/devices.types'

type DevicesProps = {
  device: Device
}

export const DeviceComponent = ({ device }: DevicesProps) => {
  const { data: devices, isLoading: loadingDevices } = useGetDevicesQuery()

  return (
    <Page titleMeta={'Devices'} descriptionMeta={'devices'} className={'pt-0'}>
      <section className={'flex justify-between flex-wrap mt-[3.04%]'}>
        <Typography variant={TypographyVariant.h3} className="text-light-100">
          Current device
        </Typography>
        <Card>
          <DynamicIcon iconId="GoogleSvgrepoCom1" width={36} height={36} />
          <Typography variant={TypographyVariant.bold_text_16} className="text-light-100">
            Google
          </Typography>
          <Typography variant={TypographyVariant.regular_text_14} className="text-light-100">
            {device.ip}
          </Typography>
        </Card>
      </section>
    </Page>
  )
}

export const Devices: NextPageWithLayout = () => {
  return (
    <Page titleMeta={'Devices'} descriptionMeta={'devices'} className={'pt-0'}>
      <section className={'flex justify-between flex-wrap mt-[3.04%]'}>
        <DeviceComponent
          device={{
            ip: '',
            title: '',
            lastActiveDate: '',
            deviceId: '',
          }}
        />
      </section>
    </Page>
  )
}
