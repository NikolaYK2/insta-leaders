import { HeadersMeta } from '@/common/components'
import { getLayout } from '@/common/components/Layout/Layout'
import { EmailSent } from '@/features/auth/ui/emailSent/EmailSent'

function Home() {
  return (
    <>
      <HeadersMeta title={'Create Next App'} />
      <h1>Home</h1>
      <EmailSent />
    </>
  )
}

Home.getLayout = getLayout
export default Home
