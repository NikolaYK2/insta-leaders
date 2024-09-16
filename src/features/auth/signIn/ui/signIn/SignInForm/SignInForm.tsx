import { Button, TextField, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import React, { useState } from 'react'
import { ForgotPassword } from '@/features/auth/signIn/ui/signIn/ForgotPassword'

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onSubmit = () => {
    console.log('email: ', email, 'password: ', password)
  }

  return (
    <form className={'text-left'}>
      <TextField
        label={'Email'}
        type={'email'}
        className={'mb-6'}
        value={email}
        onChange={onChangeEmail}
      />
      <TextField label={'Password'} password value={password} onChange={onChangePassword} />
      <ForgotPassword />

      <Button fullWidth onSubmit={onSubmit}>
        <Typography variant={TypographyVariant.h3}>Sign In</Typography>
      </Button>
    </form>
  )
}
