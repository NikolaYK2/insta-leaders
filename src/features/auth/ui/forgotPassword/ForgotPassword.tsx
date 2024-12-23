import ReCAPTCHA from 'react-google-recaptcha';

import React, {useState} from 'react'
import {NextPageWithLayout} from '@/pages/_app'
import {Button, Card, Recaptcha, Typography, TypographyVariant} from '@nikolajk2/lib-insta-leaders'
import {FormInput} from '@/common/components/ControllerInput/ControllerInput'
import {useForm} from 'react-hook-form'
import {
  ForgotPasswordZodSchema,
  ForgotPasswordZodSchemaFields,
} from '@/features/auth/ui/forgotPassword/forgotPasswordZodSchema'
import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {ROUTES_AUTH} from '@/appRoot/routes/routes'
import {useForgotPasswordMutation} from '@/features/auth/api/authService'
import {SendLinkResponseError} from '@/features/auth/api/authService.types'
import {Page} from '@/common/components/page'

export const ForgotPassword: NextPageWithLayout = () => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false); // Состояние для истечения токена
  const [isErrorRecaptcha, setIsErrorRecaptcha] = useState(false);// Состояние для проверки на робота
  const [sendLinkSuccess, setSendLinkSuccess] = useState(false)
  const [sendLink] = useForgotPasswordMutation()

  const {handleSubmit, control, setError, clearErrors} = useForm<ForgotPasswordZodSchemaFields>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordZodSchema),
  })

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setIsExpired(false);
    setIsErrorRecaptcha(false)
    clearErrors()
  };

  const onSubmit = handleSubmit(async ({email}) => {
    setSendLinkSuccess(false)

    if (!recaptchaToken || isExpired) {
      setIsErrorRecaptcha(true)
      return;
    }
    try {
      await sendLink({email, recaptcha: recaptchaToken, baseUrl: process.env.NEXT_PUBLIC_BASE_URL}).unwrap()
      setSendLinkSuccess(true)
    } catch (e: SendLinkResponseError | any) {
      setError('email', {
        type: 'manual',
        message: e?.data?.message || 'Something went wrong',
      })
    }
  })

  const isRecaptcha = Boolean(recaptchaToken) && !isExpired
  return (

    <Page
      titleMeta={'Forgot Password'}
      descriptionMeta={'Reset your password if you have forgotten it'}
      className={'flex justify-center'}
    >
      <Card className={'max-w-[378px] mx-auto flex flex-col items-center px-[24px] py-[23px]'}>
        <Typography variant={TypographyVariant.h1} className={'text-light-100'}>
          Forgot Password
        </Typography>

        <form onSubmit={onSubmit} className={'mt-[37px] !w-330'}>
          <FormInput name={'email'} label={'Email'} control={control}/>

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
          <Button variant={'primary'} className={'mt-4 h-9'} fullWidth>
            {sendLinkSuccess ? 'Send Link Again' : 'Send Link'}
          </Button>

          <Button asChild variant={'text'} className={'mt-[24px] h-[36px]'} fullWidth>
            <Link href={ROUTES_AUTH.LOGIN}>
              <Typography variant={TypographyVariant.h3}>Back to Sign In</Typography>
            </Link>
          </Button>

          <div className={'relative flex flex-col w-full mt-6 px-7'}>
            <ReCAPTCHA
              className={'absolute inset-0 z-50 opacity-0 w-full h-full cursor-pointer'}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY || ''}
              onChange={onRecaptchaChange}
            />
            {/*кастомный рекаптча так как от библиотеки не стилизуется*/}
            <Recaptcha className={'flex items-center justify-between relative max-w-full w-full'}
                       isVerified={isRecaptcha}
                       expired={isExpired}
                       error={isErrorRecaptcha}
            />
          </div>
        </form>

      </Card>
    </Page>

  )
}
