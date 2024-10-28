import { HeadersMeta } from '@/common/components'
import { PublicLayout } from '@/common/components/Layout/PublicLayout'

function Main() {
  return (
    <>
      <HeadersMeta title={'Create Next App'} />
      <h1>Home</h1>
    </>
  )
}

Main.getLayout = PublicLayout
export default Main
