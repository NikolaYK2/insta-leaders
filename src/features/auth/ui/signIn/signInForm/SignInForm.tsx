import { Button, TextField, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useLoginMutation } from '@/features/auth/api/authService'
import { LoginFields, LoginSchema } from './signInFormSchema'
import { ROUTES_APP, ROUTES_AUTH } from '@/appRoot/routes/routes'
import Link from 'next/link'

export const SignInForm = () => {
  const [signIn, { data, isError, isLoading }] = useLoginMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: zodResolver(LoginSchema) })

  const onSubmit = handleSubmit(async data => {
    try {
      await signIn(data)
        .unwrap()
        .then(data => {
          localStorage.setItem('accessToken', data.data.accessToken)
          router.push(ROUTES_APP.CREATE)
        })
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <form className={'text-left'} onSubmit={onSubmit}>
      <TextField
        label={'Email'}
        type={'email'}
        className={'mb-6'}
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <TextField
        label={'Password'}
        password
        {...register('password')}
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
