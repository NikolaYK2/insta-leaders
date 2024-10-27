import { HeadersMeta } from '@/common/components'
import { PublicLayout } from '@/common/components/Layout/PublicLayout'

function Home() {
  return (
    <>
      <HeadersMeta title={'Create Next App'} />
      <h1>Home</h1>
    </>
  )
}

Home.getLayout = PublicLayout
export default Home
