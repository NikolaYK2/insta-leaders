import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/common/components/Layout/BaseLayout'

const NotFound: NextPageWithLayout = () => <div>404 Not Found!</div>

NotFound.getLayout = getLayout
export default NotFound
