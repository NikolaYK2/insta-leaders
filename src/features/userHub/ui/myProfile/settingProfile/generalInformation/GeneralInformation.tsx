import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'
import {
  Button,
  SelectItem,
  Typography,
  TypographyVariant,
  useSelectedCalendar,
} from '@nikolajk2/lib-insta-leaders'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerSelect, FormInput } from '@/common/components'
import { ControllerInputDataPicker } from '@/common/components/ControllerInputDataPicker/ControllerInputDataPicker'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'
import { NextPageWithLayout } from '@/pages/_app'
import { useGeCitiesQuery, useGetCountriesQuery } from '@/features/userHub/api/geo/geoService'
import { useDebounce } from '@/common/hooks'
import { FormTextarea } from '@/common/components/ControllerTextarea'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'

const profileSchema = z.object({
  userName: z.string().min(6, 'min liters').max(30, 'max litters 30'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.any().optional(),
  countryCode: z.string().optional(),
  cityId: z.string().optional(),
  aboutMe: z.string().max(200, 'max litter 200'),
  search: z.string().max(200, 'max litter 200'),
})
type FormType = z.infer<typeof profileSchema>
const textFields = [
  { label: 'User Name', name: 'userName', placeholder: 'Your nickname.' },
  { label: 'First Name', name: 'firstName', placeholder: 'Your name' },
  { label: 'Last Name', name: 'lastName', placeholder: 'Your surname' },
] as const

export const GeneralInformation: NextPageWithLayout = () => {
  const { data: usersData, isLoading: isLoadingUserData } = useGetUsersMeQuery()
  const { data: countries } = useGetCountriesQuery()
  const { selectedDate } = useSelectedCalendar()

  const { handleSubmit, control, getValues, watch, reset } = useForm<FormType>({
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      countryCode: '',
      cityId: '',
      aboutMe: '',
      search: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const debounceSearch = useDebounce(watch('search'), 500)

  const dateOfBirth = watch('dateOfBirth')
  const isValidDate = dateOfBirth && !isNaN(new Date(dateOfBirth).getTime())
  const age = isValidDate
    ? Math.floor(
        (new Date().getTime() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      )
    : null

  const { data: citiesData, isLoading: isLoadingCities } = useGeCitiesQuery(
    {
      pageSize: 10,
      pageNumber: 1,
      countryCode: watch('countryCode') ?? '',
      searchNameTerm: debounceSearch,
    },
    { skip: !getValues('countryCode') }
  )
  const cities = citiesData?.data.cities

  const onSubmit: SubmitHandler<FormType> = data => {
    console.log(data)
  }
  useEffect(() => {
    if (usersData) {
      reset({
        aboutMe: usersData?.data.aboutMe ?? '',
        cityId: String(usersData?.data.cityId) ?? '',
        countryCode: usersData?.data.countryCode ?? '',
        dateOfBirth: usersData?.data.dateOfBirth ?? '',
        firstName: usersData?.data.firstName ?? '',
        search: '',
        lastName: usersData?.data.lastName ?? '',
        userName: usersData?.data.userName ?? '',
      })
    }
  }, [usersData, reset])

  if (isLoadingUserData) {
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
              placeholder={field.placeholder}
              required
            />
          ))}

          <ControllerInputDataPicker
            name={'dateOfBirth'}
            label={'Date of birth'}
            control={control}
            selected={selectedDate}
            error={
              age !== null &&
              age < 13 && (
                <div className="flex">
                  <Typography variant={TypographyVariant.small_text}>
                    A user under 13 cannot create a profile.
                  </Typography>
                  <Typography
                    className="text-danger-500 ml-1"
                    variant={TypographyVariant.small_link}
                  >
                    <Link
                      href={{ pathname: ROUTES_AUTH.PRIVACY_POLICY, query: { from: 'profile' } }}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                </div>
              )
            }
          />

          <div className={'flex flex-wrap justify-between mt-4'}>
            <ControllerSelect
              label={'Select your country'}
              className={'max-w-[358px] w-full'}
              name={'countryCode'}
              control={control}
              placeholder={'Country'}
            >
              {countries?.data?.countries?.map(country => (
                <SelectItem className={'w-[356px] '} key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </ControllerSelect>

            <ControllerSelect
              label={'Select your city'}
              className={'max-w-[358px] w-full relative'}
              name={'cityId'}
              control={control}
              placeholder={'City'}
            >
              {cities && (
                <FormInput
                  search
                  name={'search'}
                  control={control}
                  className={'sticky top-0 left-0 z-50 bg-dark-300 w-[356px]'}
                />
              )}
              {cities ? (
                <>
                  {cities.length < 1 ? (
                    <SelectItem value={'not city'} className={'px-3 py-[6px]'} disabled>
                      not country
                    </SelectItem>
                  ) : (
                    cities.map(city => (
                      <SelectItem className={'w-[355px]'} key={city.id} value={String(city.id)}>
                        {city.name}
                      </SelectItem>
                    ))
                  )}
                </>
              ) : (
                <SelectItem className={'w-[356px]'} key={'not found'} value={'not found'} disabled>
                  select country first
                </SelectItem>
              )}
            </ControllerSelect>
          </div>

          <FormTextarea
            className={'mt-7'}
            name={'aboutMe'}
            label={'About Me'}
            control={control}
            placeholder={'Write about yourself'}
          />

          <div className={'border-[1px] border-dark-300 my-7'} />
          <Button className={'ml-auto'}>
            <Typography variant={TypographyVariant.h3}>Save Changes</Typography>
          </Button>
        </form>
      </div>
    </Page>
  )
}
