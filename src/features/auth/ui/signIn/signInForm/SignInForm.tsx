import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useLoginMutation } from '@/features/auth/api/authService'
import { LoginFields, LoginSchema } from './signInFormSchema'
import { ROUTES_APP, ROUTES_AUTH } from '@/appRoot/routes/routes'
import Link from 'next/link'
import { FormInput } from '@/common/components'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

export const SignInForm = () => {
  const [signIn, { data, isError, isLoading }] = useLoginMutation()
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFields>({ resolver: zodResolver(LoginSchema) })

  const onSubmit = handleSubmit(async data => {
    try {
      await signIn(data)
        .unwrap()
        .then(data => {
          LocalStorageUtil.setValue('accessToken', data.data.accessToken)
          router.push(ROUTES_APP.CREATE)
        })
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <form className={'text-left'} onSubmit={onSubmit}>
      <FormInput name={'email'} control={control} label={'Email'} className={'mb-6'} />
      <FormInput
        name={'password'}
        control={control}
        label={'Password'}
        className={'mb-6'}
        password
        errorMessage={
          isError
            ? 'The email or password are incorrect. Try again please'
            : errors.password?.message
        }
      />
      <div className={'flex pt-9 pb-6 justify-end'}>
        <Link href={ROUTES_AUTH.FORGOT_PASSWORD}>
          <Typography
            className={'text-light-900 hover:text-light-100'}
            variant={TypographyVariant.regular_text_14}
          >
            Forgot Password
          </Typography>
        </Link>
      </div>

      <Button fullWidth disabled={isLoading}>
        <Typography variant={TypographyVariant.h3}>Sign In</Typography>
      </Button>
    </form>
  )
}
