import { NextPageWithLayout } from "@/pages/_app";
import { PublicLayout } from "@/common/components/Layout/PublicLayout";

const NotFound: NextPageWithLayout = () => <div>404 Not Found!</div>;

NotFound.getLayout = PublicLayout;
export default NotFound;
