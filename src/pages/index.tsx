import { HeadersMeta } from '@/common/components'
import { getLayout } from '@/common/components/Layout/Layout'

function Home() {
  return (
    <>
      <HeadersMeta title={'home page'} />
    </>
  )
}

Home.getLayout = getLayout
export default Home
