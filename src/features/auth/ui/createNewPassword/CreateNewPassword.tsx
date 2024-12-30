import React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Button,
  Card,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/common/components/ControllerInput/ControllerInput";
import { z } from "zod";
import { useCreateNewPasswordMutation } from "../../api/authService";
import { useRouter } from "next/router";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";
import { Page } from "@/common/components/page";
import { passwordSchema } from "@/features/auth/ui/createNewPassword/validation";
import { showAlert } from "@/appRoot/app.slice";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";

type PasswordFields = z.infer<typeof passwordSchema>;

export const CreateNewPassword: NextPageWithLayout = () => {
  const [createNewPassword, { isLoading, isError, error }] =
    useCreateNewPasswordMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { code } = router.query;

  const { handleSubmit, control } = useForm<PasswordFields>({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createNewPassword({
        newPassword: data.password,
        recoveryCode: code as string,
      }).unwrap();

      await router.push(ROUTES_AUTH.LOGIN);
    } catch (err: any) {
      console.log(err);
      dispatch(
        showAlert({
          variant: "alertError",
          message:
            err?.data.messages[0].message || "Failed to create new password:",
        }),
      );
    }
  });

  return (
    <Page
      titleMeta={"Sign Up"}
      descriptionMeta={"Create a new account by signing up"}
    >
      <Card className={"max-w-[378px] mx-auto p-6 flex flex-col"}>
        <Typography
          className={"text-center mb-[37px]"}
          variant={TypographyVariant.h1}
        >
          Create New Password
        </Typography>

        <form onSubmit={onSubmit}>
          {/* USER PASSWORD*/}
          <div className={"mb-6"}>
            <FormInput
              type={"password"}
              name={"password"}
              label={"Password"}
              control={control}
              placeholder={"******************"}
              password
            />
          </div>

          {/* USER PASSWORD CONFIRMATION*/}
          <div className={"mb-5"}>
            <FormInput
              type={"password"}
              name={"passwordConfirmation"}
              label={"Password confirmation"}
              control={control}
              placeholder={"******************"}
              password
            />
          </div>

          <Typography
            className={"text-light-900"}
            variant={TypographyVariant.regular_text_14}
          >
            Your password must be between 6 and 20 characters
          </Typography>
          <div className={"flex flex-col  space-y-5 mt-10"}>
            <Button className={" font-semibold text-base"} disabled={isLoading}>
              Create New Password
            </Button>
          </div>
        </form>
      </Card>
    </Page>
  );
};
