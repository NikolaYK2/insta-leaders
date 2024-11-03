import React, { ChangeEvent, useState } from 'react'
import { AuthByGoogle } from '@/common/components'
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
import { Page } from '@/common/components/page'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/appRoot/store'

export const SignUp: NextPageWithLayout = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    trigger,
    setValue,
    clearErrors,
    setError,
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

  const [signUp] = useRegistrationMutation()
  const onSubmit = handleSubmit(async ({ userName, password, email, ...rest }) => {
    try {
      await signUp({ userName, password, email }).unwrap()
      setShowModal(true)
    } catch (e: any) {
      if (e.status === 400 && e.data.message === 'Email or username is already registered') {
        setError('email', {
          message: e.data.message,
        })
      } else {
        console.log(e)
      }
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
  const onChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name as 'userName' | 'email' | 'password' | 'passwordConfirmation'
    setValue(name, value)
    if (!isValid) {
      clearErrors(name)
    }
  }

  return (
    <Page titleMeta={'Sign Up'} descriptionMeta={'Create a new account by signing up'}>
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
              onBlur={() => trigger('userName')}
              onChange={onChangeInput}
            />
          </div>

          {/* USER EMAIL*/}
          <div className={'mb-6'}>
            <FormInput
              name={'email'}
              label={'Email'}
              control={control}
              placeholder={'Epam@epam.com'}
              onBlur={() => trigger('email')}
              onChange={onChangeInput}
            />
          </div>

          {/* USER PASSWORD*/}
          <div className={'mb-6'}>
            <FormInput
              type={!showPassword ? 'password' : 'text'}
              name={'password'}
              label={'Password'}
              control={control}
              placeholder={'******************'}
              onBlur={() => trigger('password')}
              onChange={onChangeInput}
              iconEnd={
                <DynamicIcon
                  onClick={() => setShowPassword(prevState => !prevState)}
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
              name={'passwordConfirmation'}
              label={'Password confirmation'}
              control={control}
              placeholder={'******************'}
              onBlur={() => trigger('passwordConfirmation')}
              onChange={onChangeInput}
              iconEnd={
                <DynamicIcon
                  onClick={() => setShowPasswordConfirmation(prevState => !prevState)}
                  className={'cursor-pointer'}
                  iconId={showPasswordConfirmation ? 'Eye' : 'EyeOff'}
                />
              }
            />
          </div>

          {/* Условия соглашения */}
          <div className={'flex flex-col space-y-5'}>
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
    </Page>
  )
}
