import { HeadersMeta } from '@/common/components'
import { getLayout } from '@/common/components/Layout/Layout'

function Home() {
  return (
    <>
      <HeadersMeta title={'Create Next App'} />
      <h1>Home</h1>
    </>
  )
}

Home.getLayout = getLayout
export default Home
