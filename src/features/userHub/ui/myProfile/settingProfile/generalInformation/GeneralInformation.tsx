import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'
import {
  Button,
  SelectItem,
  Selector,
  Typography,
  TypographyVariant,
  useSelectedCalendar,
} from '@nikolajk2/lib-insta-leaders'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/common/components'
import { ControllerInputDataPicker } from '@/common/components/ControllerInputDataPicker/ControllerInputDataPicker'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'
import { NextPageWithLayout } from '@/pages/_app'

const profileSchema = z.object({
  userName: z.string().min(6, 'min liters').max(30, 'max litters 30'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.any().optional(),
  countryCode: z.object({}).optional(),
  cityId: z.object({}).optional(),
  aboutMe: z.string().max(200, 'max litter 200'),
})
type FormType = z.infer<typeof profileSchema>
const textFields = [
  { label: 'User Name*', name: 'userName' },
  { label: 'First Name*', name: 'firstName' },
  { label: 'Last Name*', name: 'lastName' },
] as const

export const GeneralInformation: NextPageWithLayout = () => {
  const { data: usersData, isLoading } = useGetUsersMeQuery()
  console.log(usersData)
  const { selectedDate } = useSelectedCalendar()

  const { handleSubmit, control, setValue } = useForm<FormType>({
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      countryCode: {},
      cityId: {},
      aboutMe: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const onSubmit: SubmitHandler<FormType> = data => {
    console.log(data)
  }
  useEffect(() => {
    setValue('userName', usersData?.data.userName ?? '')
    setValue('firstName', usersData?.data.firstName ?? '')
    setValue('lastName', usersData?.data.lastName ?? '')
    setValue('aboutMe', usersData?.data.aboutMe ?? '')
    // Преобразуем дату в формат ISO 8601, если она доступна
    const formattedDate = usersData?.data.dateOfBirth
      ? new Date(usersData.data.dateOfBirth).toISOString()
      : ''
    setValue('dateOfBirth', formattedDate ?? '')
    setValue('countryCode', usersData?.data.countryCode ?? {})
    setValue('cityId', usersData?.data.cityId ?? {})
  }, [usersData])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Page titleMeta={'General information'} descriptionMeta={'info'} className={'px-0'}>
      <div className={'flex justify-between'}>
        <div className={'border-2 border-red-800 mr-1 max-w-[196px] w-full'}>
          <div
            className={
              'w-[192px] h-[192px] border-2 border-cyan-50 rounded-full mb-[30px] mt-[25px]'
            }
          ></div>
          <Button variant={'outline'}>
            <Typography variant={TypographyVariant.h3}>Add a Profile Photo</Typography>
          </Button>
        </div>
        <form className={'flex flex-col max-w-[740px] w-full'} onSubmit={handleSubmit(onSubmit)}>
          {textFields.map(field => (
            <FormInput
              className={'mb-6 w-full'}
              key={field.label}
              label={field.label}
              name={field.name}
              control={control}
            />
          ))}
          <ControllerInputDataPicker
            name={'dateOfBirth'}
            label={'Date of birth'}
            control={control}
            selected={selectedDate}
          />
          <div className={'flex justify-between mt-9'}>
            <Selector className={'max-w-[358px] mr-1'} defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
            <Selector className={'max-w-[358px]'} defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
          </div>

          <textarea className={'w-full mt-9 bg-dark-300 text-light-100'} />
          <div className={'border-[1px] border-dark-300 my-7'} />
          <Button className={'ml-auto'}>
            <Typography variant={TypographyVariant.h3}>Save Changes</Typography>
          </Button>
        </form>
      </div>
    </Page>
  )
}
