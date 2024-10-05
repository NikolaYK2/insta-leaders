import React, { useState } from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import { Button, Card, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { FormInput } from '@/common/components/ControllerInput/ControllerInput'
import { useForm } from 'react-hook-form'
import { useForgotPasswordMutation } from '@/features/auth/ui/forgotPassword/forgotPasswordApi'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  ForgotPasswordZodSchema,
  ForgotPasswordZodSchemaFields,
} from '@/features/auth/ui/forgotPassword/forgotPasswordZodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
import { SendLinkResponseError } from '@/features/auth/ui/forgotPassword/forgotPassword.types'

export const ForgotPassword: NextPageWithLayout = () => {
  const { handleSubmit, control, setError } = useForm<ForgotPasswordZodSchemaFields>({
    resolver: zodResolver(ForgotPasswordZodSchema),
  })

  const [sendLinkSuccess, setSendLinkSuccess] = useState<boolean>(false)

  const [sendLink] = useForgotPasswordMutation()

  const { executeRecaptcha } = useGoogleReCaptcha() // Use reCAPTCHA v3 hook

  const onSubmit = handleSubmit(async ({ email }) => {
    setSendLinkSuccess(false)

    if (!executeRecaptcha) {
      console.log('reCAPTCHA has not been loaded yet')
      return
    }

    try {
      // Execute reCAPTCHA and get the token
      const recaptchaToken = await executeRecaptcha('forgot_password')

      // Call the API with the email and reCAPTCHA token
      const res = await sendLink({ email, recaptchaValue: recaptchaToken }).unwrap()

      // In case of success response
      if (res.status === 'success') {
        setSendLinkSuccess(true)
      }
    } catch (e: SendLinkResponseError | any) {
      setError('email', {
        type: 'manual',
        message: e?.data?.message || 'Something went wrong',
      })
    }
  })

  return (
    <div className={'flex justify-center'}>
      <HeadersMeta
        title={'Forgot Password'}
        description={'Reset your password if you have forgotten it'}
      />
      <Card className={'!w-378 flex flex-col items-center px-[24px] py-[23px]'}>
        <Typography variant={TypographyVariant.h1} className={'text-light-100'}>
          Forgot Password
        </Typography>

        <form onSubmit={onSubmit} className={'mt-[37px] !w-330'}>
          <FormInput
            name={'email'}
            label={'Email'}
            control={control}
            placeholder={'Epam@epam.com'}
          />

          <Typography
            variant={TypographyVariant.regular_text_14}
            className={'mt-[10px] text-light-900'}
          >
            Enter your email address and we will send you further instructions
          </Typography>

          {sendLinkSuccess && (
            <Typography
              variant={TypographyVariant.regular_text_14}
              className={'text-light-100 mt-[23px]'}
            >
              The link has been sent by email. If you don’t receive an email send link again
            </Typography>
          )}
          <Button variant={'primary'} className={'mt-[17px] h-[36px]'} fullWidth type="submit">
            {sendLinkSuccess ? 'Send Link Again' : 'Send Link'}
          </Button>

          <Button asChild variant={'text'} className={'mt-[24px] h-[36px]'} fullWidth>
            <Link href={ROUTES_AUTH.LOGIN}>
              <Typography variant={TypographyVariant.h3}>Back to Sign In</Typography>
            </Link>
          </Button>
        </form>
      </Card>
    </div>
  )
}
