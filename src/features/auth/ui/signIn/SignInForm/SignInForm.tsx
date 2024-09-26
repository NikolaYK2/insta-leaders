import { Button, TextField, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { ToForgotPassword } from '../ToForgotPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLoginMutation } from '@/features/auth/ui/signIn/SignInForm/LoginAPI'
import { useRouter } from 'next/router'

const LoginSchema = z.object({
  email: z.string().min(1, 'Required').email('Неверный адрес электронной почты'),
  password: z.string().min(1, 'Required').min(3, 'Минимум 3 символа'),
})

type LoginFields = z.infer<typeof LoginSchema>
export const SignInForm = () => {
  const [login, { data, isError, isLoading }] = useLoginMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: zodResolver(LoginSchema) })

  const onSubmit = handleSubmit(data => {
    login(data)
      .unwrap()
      .then(() => router.push('/'))
  })

  // if (isLoading) {
  //   return <h1>LOADING....</h1>
  // }

  // if (error) {
  //   return <h1>ERROR</h1>
  // }

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
        errorMessage={errors.password?.message}
      />
      <ToForgotPassword />
      <Button fullWidth disabled={isLoading}>
        <Typography variant={TypographyVariant.h3}>Sign In</Typography>
      </Button>
    </form>
  )
}
