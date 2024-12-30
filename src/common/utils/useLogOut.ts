import { useLogOutMutation } from "@/features/auth/api/authService";
import { useRouter } from "next/router";
import { LocalStorageUtil } from "@/common/utils/LocalStorageUtil";
import { indexDBUtils } from "@/common/utils/indexedDB";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";

export const useLogOut = () => {
  const router = useRouter();

  const [logout] = useLogOutMutation();

  const onLogOut = async () => {
    try {
      await logout().unwrap();
      LocalStorageUtil.removeItem("accessToken");
      LocalStorageUtil.removeItem("userId");
      LocalStorageUtil.removeItem("email");
      await indexDBUtils.clearAllImages();
      await router.push(ROUTES_AUTH.HOME);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return { onLogOut };
};
