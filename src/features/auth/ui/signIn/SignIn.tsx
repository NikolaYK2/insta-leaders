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
  const client_id = '792546249106-u5of55jk4hus635kpd936g5968b62a1c.apps.googleusercontent.com'
  const redirect_uri = 'http://localhost:3000/google'
  const state = '50c45fc5314190fc5d117c09dc9ebadf'
  const linkToGoogleLogin = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=code&scope=email profile&redirect_uri=${redirect_uri}&state=${state}`

  return (
    <>
      <HeadersMeta title={'Sign In'} description={'Access your account by signing in'} />
      <div className={'w-[378px]  mx-auto'}>
        <Card className={'text-center p-6'}>
          <Typography variant={TypographyVariant.h1} asChild>
            <h1>Sign In</h1>
          </Typography>

          <div className={'w-[132px] m-auto mb-6 mt-3 flex justify-between'}>
            <Link className={'flex items-center'} href={linkToGoogleLogin}>
              <DynamicIcon iconId={'GoogleSvgrepoCom1'} width={36} height={36} />
            </Link>
            <Link
              className={'flex items-center'}
              href={
                'https://github.com/login/oauth/authorize?client_id=Ov23lix6EdcGrBfP7Bee&response_type=code&scope=user&redirect_uri=http://localhost:3000/github&state=50c45fc5314190fc5d117c09dc9ebadf'
              }
            >
              <DynamicIcon iconId={'GithubSvgrepoCom31'} width={36} height={36} color={'none'} />
            </Link>
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
