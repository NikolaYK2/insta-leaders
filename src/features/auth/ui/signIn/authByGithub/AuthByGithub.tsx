import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

export const AuthByGithub = () => {
  // The client id from github
  const client_id = 'Ov23lix6EdcGrBfP7Bee'

  // На какой адрес клиента ГитХаб должен сделать переадресацию после того,
  // как пользователь разрешит использовать его данные на нашем сайте
  const redirect_uri = 'http://localhost:3000/github'

  const state = '50c45fc5314190fc5d117c09dc9ebadf'
  const link = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=user&redirect_uri=${redirect_uri}&state=${state}`

  return (
    <Link
      className={'flex items-center hover:text-light-100 p-1 border-2 border-transparent'}
      href={link}
    >
      <DynamicIcon iconId={'GithubSvgrepoCom31'} width={36} height={36} />
    </Link>
  )
}
