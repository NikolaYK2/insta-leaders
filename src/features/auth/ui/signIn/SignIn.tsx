import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Button,
  Card,
  DynamicIcon,
  TextField,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

export const SignIn: NextPageWithLayout = () => {
  return (
    <>
      <HeadersMeta title={'Sign In'} description={'Access your account by signing in'} />
      <div className={'w-[378px]  mx-auto'}>
        <Card className={'text-center p-6'}>
          <Typography variant={TypographyVariant.h1} asChild>
            <h1>Sign In</h1>
          </Typography>
          <div className={'w-[132px] m-auto mb-6 mt-3 flex justify-between'}>
            <DynamicIcon iconId={'GoogleSvgrepoCom1'} width={36} height={36} />
            <DynamicIcon iconId={'GithubSvgrepoCom31'} width={36} height={36} />
          </div>
          <form>
            <TextField label={'Email'} type={'email'} className={'mb-6'}></TextField>
            <TextField label={'Password'} password></TextField>
            <Link href={'/forgotPassword'}>
              <Typography
                className={'text-light-900 mt-9 mb-6 text-right'}
                variant={TypographyVariant.regular_text_14}
              >
                Forgot Password
              </Typography>
            </Link>

            <Button fullWidth>
              <Typography variant={TypographyVariant.h3}>Sign In</Typography>
            </Button>
            <Typography variant={TypographyVariant.regular_text_16} className={'mt-[18px] mb-2'}>
              Don’t have an account?
            </Typography>
            <Button variant={'text'} asChild>
              <Link href={'/signUp'}>
                <Typography variant={TypographyVariant.h3}>Sign Up</Typography>
              </Link>
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
