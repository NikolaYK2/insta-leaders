import { useMeQuery } from "@/features/auth/api/authService";
import { PrivateLayout } from "@/common/components/Layout/PrivatLayout";
import { PublicLayout } from "@/common/components/Layout/PublicLayout";
import { Home } from "@/features/userHub/ui/home/Home";
import { HomePublic } from "@/features/userHub/ui/homePublic/PublicHome";

export default function Main() {
  const {
    data: me,
    isLoading: loadMe,
    isError: isErrMe,
    error: errMe,
  } = useMeQuery();
  const isAuthenticated = Boolean(me);

  const Layout = isAuthenticated ? PrivateLayout : PublicLayout;
  const HomeComponent = isAuthenticated ? Home : HomePublic;

  if (loadMe) return <div>Loading...</div>;
  // if (isErrMe) return <div>Error...{JSON.stringify(errMe)}</div>

  return Layout(<HomeComponent />);
}
