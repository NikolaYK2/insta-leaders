import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Button,
  Card,
  DynamicIcon,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
import { SignInForm } from './SignInForm/SignInForm'

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
            <button
              className={'cursor-pointer'}
              onClick={() => {
                console.log('Sign in with Google')
              }}
            >
              <DynamicIcon iconId={'GoogleSvgrepoCom1'} width={36} height={36} />
            </button>
            <button
              className={'cursor-pointer'}
              onClick={() => {
                console.log('Sign in with Github')
              }}
            >
              <DynamicIcon iconId={'GithubSvgrepoCom31'} width={36} height={36} />
            </button>
          </div>
          <SignInForm />
          <Typography variant={TypographyVariant.regular_text_16} className={'mt-[18px] mb-2'}>
            Don’t have an account?
          </Typography>
          <Button variant={'text'} asChild>
            <Link href={ROUTES_AUTH.REGISTRATION}>
              <Typography variant={TypographyVariant.h3}>Sign Up</Typography>
            </Link>
          </Button>
        </Card>
      </div>
    </>
  )
}
