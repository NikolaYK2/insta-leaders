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
import { NextPageWithLayout } from '@/pages/_app'
import { FormTextarea } from '@/common/components/ControllerTextarea'
import { AddProfilePhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { cn } from '@/common/utils/cn'
import { calculateAge } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/lib'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/userHub/api/profile/profileService'
import { ControllerInputDataPicker } from '@/common/components/ControllerInputDataPicker/ControllerInputDataPicker'
import { renderError } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/renderAgeError/RenderAgeError'
import { deepNotEqual } from '@/common/utils/deepNotEqual'

const profileSchema = z.object({
  userName: z.string().min(6, 'min liters').max(30, 'max litters 30'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.any(),
  country: z.string(),
  countryFilter: z.string().optional(),
  city: z.string(),
  cityFilter: z.string().optional(),
  aboutMe: z.string().max(200, 'max litter 200'),
})
type FormType = z.infer<typeof profileSchema>
// Определение текстовых полей для формы с метками, именами и подсказками
const textFields = [
  { label: 'User Name', name: 'userName', placeholder: 'Your nickname.' },
  { label: 'First Name', name: 'firstName', placeholder: 'Your name' },
  { label: 'Last Name', name: 'lastName', placeholder: 'Your surname' },
] as const

export const GeneralInformation: NextPageWithLayout = () => {
  const { data: profile, isLoading: isLoadProf, isError: isErrProf } = useGetProfileQuery()

  const [changeProfile, { data, isError, isLoading }] = useUpdateProfileMutation()
  // Получение выбранной даты с помощью кастомного хука
  const { selectedDate } = useSelectedCalendar()

  const { handleSubmit, control, getValues, watch, reset, setValue } = useForm<FormType>({
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: '',
      countryFilter: '',
      city: '',
      cityFilter: '',
      aboutMe: '',
    },
    resolver: zodResolver(profileSchema),
  })

  // Отслеживание ввода даты рождения для вычисления возраста, если дата валидна
  const dateOfBirth = watch('dateOfBirth')
  const age = calculateAge(dateOfBirth)

  const onSubmit = handleSubmit(async data => {
    if (profile) {
      const { cityFilter, countryFilter, ...restData } = data // Исключение поля поиска из данных для отправки
      const transformedData = {
        ...restData,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      }

      // Извлечение полей, которые не должны обновляться, из userMe
      const { id, avatars, createdAt, region, ...restProfile } = profile
      const initialValues = {
        ...restProfile,
      }

      try {
        // Обновление профиля только если есть изменения между начальными и текущими значениями
        if (deepNotEqual(transformedData, initialValues))
          await changeProfile({ ...transformedData, region })
      } catch (e) {
        console.log(e)
      }
    }
  })

  // Сброс значений формы при изменении данных userMe
  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
      })
    }
  }, [profile, reset])

  if (isLoadProf) {
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
                date: profile?.dateOfBirth ?? '',
                dateFormat: 'MM.dd.yyy',
              }) ?? ''
            }
            error={renderError(age)}
          />

          <div className={'flex flex-wrap justify-between'}>
            <ControllerSelect
              label={'Select your country'}
              className={'max-w-[358px] w-full first:mt-3'}
              name={'countryFilter'}
              control={control}
              placeholder={'Country'}
              value={getValues('country')}
            >
              <FormInput
                name={'country'}
                control={control}
                className={'sticky top-0 left-0 z-50 bg-dark-300 w-[356px]'}
              />

              <SelectItem className={'w-[356px]'} value={getValues('country') || 'country'}>
                {watch('country')}
              </SelectItem>
            </ControllerSelect>

            <ControllerSelect
              label={'Select your city'}
              className={'max-w-[358px] w-full relative last:mt-3'}
              name={'cityFilter'}
              control={control}
              placeholder={'City'}
              value={getValues('city')}
            >
              <FormInput
                name={'city'}
                control={control}
                className={'sticky top-0 left-0 z-50 bg-dark-300 w-[356px]'}
              />
              <SelectItem className={'w-[356px]'} value={getValues('city') || 'city'}>
                {watch('city')}
              </SelectItem>
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
