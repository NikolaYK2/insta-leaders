import { getLayout } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

const NotFound: NextPageWithLayout = () => <div>404 Not Found!</div>

NotFound.getLayout = getLayout
export default NotFound
