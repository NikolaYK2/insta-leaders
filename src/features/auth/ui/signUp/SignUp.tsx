import React, { useState } from 'react'
import { AuthByGoogle, HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Button,
  Card,
  DynamicIcon,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFields, signUpSchema } from '@/features/auth/ui/signUp/validation'
import { FormInput } from '@/common/components/ControllerInput/ControllerInput'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
import { useRegistrationMutation } from '@/features/auth/api/authService'
import { EmailSent } from '@/features/auth/ui'
import { ControllerCheckbox } from '@/common/components/ControllerCheckbox'
import { AuthByGithub } from '@/features/auth/ui/signIn/authByGithub/AuthByGithub'

export const SignUp: NextPageWithLayout = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isLoading, isValid },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: '',
      password: '',
      passwordConfirmation: '',
      agreesToTOS: false,
      email: '',
    },
  })
  // Не нужно так как компоненты контролируемые
  // const {
  //   field: { onChange, value, ...field },
  //   formState: { errors, isLoading },
  // } = useController({ control, name: 'agreesToTOS' })

  const [signUp] = useRegistrationMutation()
  const onSubmit = handleSubmit(async ({ userName, password, email, ...rest }) => {
    try {
      await signUp({ userName, password, email }).unwrap()
      setShowModal(true)
    } catch (e) {
      console.log(e)
    }
  })

  const handlerResetForm = () => {
    reset({
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })
  }

  return (
    <>
      <HeadersMeta title={'Sign Up'} description={'Create a new account by signing up'} />
      <EmailSent open={showModal} onOpenChange={setShowModal} modal callback={handlerResetForm}>
        {getValues().email}
      </EmailSent>
      <Card className={'max-w-[378px] mx-auto p-6 flex flex-col'}>
        <Typography className={'text-center'} variant={TypographyVariant.h1}>
          Sign Up
        </Typography>
        <div className={'flex justify-center gap-x-[60px] mb-6 mt-3'}>
          <AuthByGoogle />
          <AuthByGithub />
        </div>

        <form onSubmit={onSubmit}>
          {/* USER NAME*/}
          <div className={'mb-6'}>
            <FormInput
              name={'userName'}
              label={'Username'}
              control={control}
              placeholder={'Epam11'}
            />
          </div>

          {/* USER EMAIL*/}
          <div className={'mb-6'}>
            <FormInput
              name={'email'}
              label={'Mail'}
              control={control}
              placeholder={'Epam@epam.com'}
            />
          </div>

          {/* USER PASSWORD*/}
          <div className={'mb-6'}>
            <FormInput
              type={!showPassword ? 'password' : 'text'}
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
              type={!showPasswordConfirmation ? 'password' : 'text'}
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

          {/* Условия соглашения */}
          <div className={'flex flex-col  space-y-5'}>
            <div className={'flex items-center justify-center text-center'}>
              <ControllerCheckbox name={'agreesToTOS'} control={control} />
              <Typography variant={TypographyVariant.small_text} className={''}>
                I agree to the{' '}
                <Link
                  href={ROUTES_AUTH.TERMS_OF_SERVICE}
                  className={'text-accent-500 underline inline-block'}
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href={ROUTES_AUTH.PRIVACY_POLICY}
                  className={'text-accent-500 underline inline-block'}
                >
                  Privacy Policy
                </Link>
              </Typography>
            </div>
            {errors.agreesToTOS?.message && (
              <Typography variant={TypographyVariant.small_text} className={'text-red-500'}>
                {errors.agreesToTOS.message}
              </Typography>
            )}
            <Button disabled={isLoading || !isValid}>Sign Up</Button>
          </div>
        </form>

        {/*  Вход в аккаунт */}
        <div className={'flex flex-col items-center gap-y-3 mt-[18px] '}>
          <Typography variant={TypographyVariant.regular_text_16}>
            Do you have an account?
          </Typography>
          <Link href={ROUTES_AUTH.LOGIN} className={'text-accent-500'}>
            Sign In
          </Link>
        </div>
      </Card>
    </>
  )
}
