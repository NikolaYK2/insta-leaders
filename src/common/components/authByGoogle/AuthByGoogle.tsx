import React from "react";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { DynamicIcon } from "@nikolajk2/lib-insta-leaders";
import { useAuthGoogleMutation } from "@/features/auth/api/authService";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";
import { showAlert } from "@/appRoot/app.slice";
import { useRouter } from "next/router";
import { ROUTES_APP } from "@/appRoot/routes/routes";
import { LocalStorageUtil } from "@/common/utils/LocalStorageUtil";
import { extractUserIdFromToken } from "@/common/components";

export const AuthByGoogle = () => {
  const [authGoogle] = useAuthGoogleMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (credentialResponse: CodeResponse) => {
      try {
        // Отправляем код авторизации на сервер
        const { accessToken } = await authGoogle({
          code: credentialResponse.code,
        }).unwrap();

        // Извлекаем userId из токена
        const userId = extractUserIdFromToken(accessToken);

        // Сохраняем userId в LocalStorage
        LocalStorageUtil.setValue("userId", userId);

        // Перенаправляем на страницу профиля
        await router.push(`${ROUTES_APP.PROFILE}/${userId}`);
      } catch (error) {
        console.error("Authorization failed:", error);
        dispatch(
          showAlert({ message: "Ошибка авторизации", variant: "alertError" }),
        );
      }
    },
    onError: () =>
      dispatch(
        showAlert({ message: "Вход не выполнен", variant: "alertError" }),
      ),
  });

  return (
    <button
      className={
        "p-1 inline-flex border-2 border-transparent focus:border-2 focus:border-accent-100"
      }
      onClick={() => login()}
    >
      <DynamicIcon iconId={"GoogleSvgrepoCom1"} width={36} height={36} />
    </button>
  );
};
