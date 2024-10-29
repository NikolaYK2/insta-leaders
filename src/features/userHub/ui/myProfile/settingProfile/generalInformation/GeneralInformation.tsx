import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'
import {
  Button,
  formatDate,
  SelectItem,
  Typography,
  TypographyVariant,
  useSelectedCalendar,
} from '@nikolajk2/lib-insta-leaders'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerSelect, FormInput } from '@/common/components'
import { ControllerInputDataPicker } from '@/common/components/ControllerInputDataPicker/ControllerInputDataPicker'
import {
  useGetUsersMeQuery,
  useUpdateProfileMutation,
} from '@/features/userHub/api/user/userService'
import { NextPageWithLayout } from '@/pages/_app'
import {
  useGeCitiesQuery,
  useGeCityQuery,
  useGetCountriesQuery,
} from '@/features/userHub/api/geo/geoService'
import { useDebounce } from '@/common/hooks'
import { FormTextarea } from '@/common/components/ControllerTextarea'
import { AddProfilePhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { cn } from '@/common/utils/cn'
import { deepNotEqual } from '@/common/utils/deepNotEqual'
import { calculateAge } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/lib'
import { renderError } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/renderAgeError/RenderAgeError'

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
// Определение текстовых полей для формы с метками, именами и подсказками
const textFields = [
  { label: 'User Name', name: 'userName', placeholder: 'Your nickname.' },
  { label: 'First Name', name: 'firstName', placeholder: 'Your name' },
  { label: 'Last Name', name: 'lastName', placeholder: 'Your surname' },
] as const

export const GeneralInformation: NextPageWithLayout = () => {
  const { data: userMe, isLoading: loadingUserMe } = useGetUsersMeQuery()
  const { data: countries } = useGetCountriesQuery()

  const [changeProfile, { data, isError, isLoading }] = useUpdateProfileMutation()
  // Получение выбранной даты с помощью кастомного хука
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

  // Получение данных о городе на основе страны и ID города пользователя, пропуск, если countryCode недоступен
  const { data: city, isLoading: loadingCity } = useGeCityQuery(
    {
      countryCode: userMe?.data.countryCode ?? '',
      cityId: String(userMe?.data.cityId) ?? '',
    },
    { skip: !getValues('countryCode') }
  )

  // Дебаунс ввода для поиска, чтобы предотвратить избыточные вызовы API
  const debounceSearch = useDebounce(watch('search'), 500)

  // Отслеживание ввода даты рождения для вычисления возраста, если дата валидна
  const dateOfBirth = watch('dateOfBirth')
  const age = calculateAge(dateOfBirth)

  // Получение списка городов на основе выбранной страны и поискового термина, пропуск, если countryCode недоступен
  const { data: citiesData, isLoading: isLoadingCities } = useGeCitiesQuery(
    {
      pageSize: 10,
      pageNumber: 1,
      countryCode: getValues('countryCode') ?? '',
      searchNameTerm: debounceSearch,
    },
    { skip: !getValues('countryCode') }
  )
  const cities = citiesData?.data.cities

  //проверить
  const onSubmit = handleSubmit(async data => {
    if (userMe) {
      const { search, ...restData } = data // Исключение поля поиска из данных для отправки
      const transformedData = {
        ...restData,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        countryCode: data.countryCode ?? '',
        cityId: Number(data.cityId),
      }

      // Извлечение полей, которые не должны обновляться, из userMe
      const { avatar, id, email, ...restUserMe } = userMe.data
      const initialValues = {
        ...restUserMe,
        cityId: Number(userMe.data.cityId),
        dateOfBirth: userMe.data.dateOfBirth,
      }

      try {
        // Обновление профиля только если есть изменения между начальными и текущими значениями
        if (deepNotEqual(transformedData, initialValues)) await changeProfile(transformedData)
      } catch (e) {
        console.log(e)
      }
    }
  })

  // Сброс значений формы при изменении данных userMe
  useEffect(() => {
    if (userMe) {
      reset({
        ...userMe.data,
        search: city?.data.name,
        cityId: String(userMe.data.cityId),
      })
    }
  }, [userMe, reset, city])

  if (loadingUserMe || loadingCity) {
    return <div>Loading...</div>
  }
  return (
    <Page titleMeta={'General information'} descriptionMeta={'info'} className={'pt-0'}>
      <div className={'flex justify-between flex-wrap'}>
        <div
          className={cn(
            'flex mr-1 max-w-[196px] w-full notePad:max-w-full justify-center mt-[3.04%]'
          )}
        >
          <AddProfilePhoto />
        </div>

        <form className={'flex flex-col max-w-[740px] w-full mt-[36px]'} onSubmit={onSubmit}>
          {textFields.map(field => (
            <FormInput
              className={'mb-6'}
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
            defaultValue={
              formatDate({
                date: userMe?.data.dateOfBirth ?? '',
                dateFormat: 'MM.dd.yyy',
              }) ?? ''
            }
            error={renderError(age)}
          />

          <div className={'flex flex-wrap justify-between'}>
            <ControllerSelect
              label={'Select your country'}
              className={'max-w-[358px] w-full first:mt-3'}
              name={'countryCode'}
              control={control}
              placeholder={'Country'}
            >
              {countries?.data?.countries?.map(country => (
                <SelectItem className={'w-[356px]'} key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </ControllerSelect>

            <ControllerSelect
              label={'Select your city'}
              className={'max-w-[358px] w-full relative last:mt-3'}
              name={'cityId'}
              control={control}
              placeholder={'City'}
              value={watch('cityId') || city?.data?.name || ''}
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
          <Button className={'ml-auto'} disabled={isLoading || (age !== null && age < 13)}>
            <Typography variant={TypographyVariant.h3}>Save Changes</Typography>
          </Button>
        </form>
      </div>
    </Page>
  )
}
