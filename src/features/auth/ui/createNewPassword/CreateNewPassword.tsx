
import React, { useState } from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Button,
  Card,
  DynamicIcon,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import { useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/common/components/ControllerInput/ControllerInput'
import { z } from 'zod'
import { useCreateNewPasswordMutation } from '../../api/authService'
import { useRouter } from 'next/router'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'

export const CreateNewPassword: NextPageWithLayout = () => {
  const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20'),
    passwordConfirmation: z.string(),
  })
  .refine(value => value.password === value.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

  type PasswordFields = z.infer<typeof passwordSchema>
  const { handleSubmit, control } = useForm<PasswordFields>({ resolver: zodResolver(passwordSchema) })
  
  const {
    field: { onChange: onChangePassword, value: passwordValue, ...passwordField },
    formState: { errors: passwordErrors,  },
  } = useController({ name: 'password', control });

  const {
    field: { onChange: onChangePasswordConfirmation, value: passwordConfirmationValue, ...passwordConfirmationField },
    formState: { errors: passwordConfirmationErrors },
  } = useController({ name: 'passwordConfirmation', control });


  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [createNewPassword, { isLoading, isError, error }] = useCreateNewPasswordMutation();
  const router = useRouter();
  const { recoveryCode } = router.query;
  const onSubmit = handleSubmit(async data => {
    try {
      const response = await createNewPassword({
        newPassword: data.password,
        recoveryCode:  recoveryCode as string, 
      }).unwrap();
      console.log('Password created successfully:', response);
      router.push(ROUTES_AUTH.LOGIN);
    } catch (err) {
      console.error('Failed to create new password:', err);
    }
  });
  
  return (
    <div>
      <HeadersMeta title={'Sign Up'} description={'Create a new account by signing up'} />
      <Card className={'max-w-[378px] mx-auto p-6 flex flex-col'}>
        <Typography className={'text-center'} variant={TypographyVariant.h1}>
        Create New Password
        </Typography>

        <form onSubmit={onSubmit}>

          {/* USER PASSWORD*/}
          <div className={'mb-6'}>
            <FormInput
              type={showPassword ? 'password' : 'text'}
              onClick={() => setShowPassword(prevState => !prevState)}
              name={'password'}
              label={'Password'}
              control={control}
              placeholder={'******************'}
              iconEnd={
                <DynamicIcon
                  className={'cursor-pointer'}
                  iconId={showPassword ? 'Eye' : 'EyeOff'}
                />
              }
            />
          </div>

          {/* USER PASSWORD CONFIRMATION*/}
          <div className={'mb-5'}>
            <FormInput
              type={showPasswordConfirmation ? 'password' : 'text'}
              onClick={() => setShowPasswordConfirmation(prevState => !prevState)}
              name={'passwordConfirmation'}
              label={'Password confirmation'}
              control={control}
              placeholder={'******************'}
              iconEnd={
                <DynamicIcon
                  className={'cursor-pointer'}
                  iconId={showPasswordConfirmation ? 'Eye' : 'EyeOff'}
                />
              }
            />
          </div>
          <div className={'flex flex-col  space-y-5'}>
          <Button className={' font-semibold text-base' } type='submit' disabled={isLoading}>Create New Password</Button>
          </div>
          </form>
          </Card>
          </div>
  )
}
