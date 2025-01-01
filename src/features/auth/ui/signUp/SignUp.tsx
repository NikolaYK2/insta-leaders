import React, { useState } from "react";
import { AuthByGoogle } from "@/common/components";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Button,
  Card,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFields,
  signUpSchema,
} from "@/features/auth/ui/signUp/validation";
import { FormInput } from "@/common/components/ControllerInput/ControllerInput";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";
import { useRegistrationMutation } from "@/features/auth/api/authService";
import { EmailSent } from "@/features/auth/ui";
import { ControllerCheckbox } from "@/common/components/ControllerCheckbox";
import { AuthByGithub } from "@/features/auth/ui/signIn/authByGithub/AuthByGithub";
import { Page } from "@/common/components/page";

export const SignUp: NextPageWithLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    setError,
    formState: { errors, isLoading, isValid },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      password: "",
      passwordConfirmation: "",
      agreesToTOS: false,
      email: "",
    },
  });

  const [signUp] = useRegistrationMutation();
  const onSubmit = handleSubmit(
    async ({ userName, password, email, ...rest }) => {
      try {
        await signUp({
          userName,
          password,
          email,
          baseUrl: process.env.NEXT_PUBLIC_MAIL_URL,
        }).unwrap();
        setShowModal(true);
      } catch (e: any) {
        setError(e.data.messages[0]?.field, {
          message: e.data.messages[0]?.message || "error registration",
        });
      }
    },
  );
  const handlerResetForm = () => {
    reset({
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  return (
    <Page
      titleMeta={"Sign Up"}
      descriptionMeta={"Create a new account by signing up"}
    >
      <EmailSent
        open={showModal}
        onOpenChange={setShowModal}
        modal
        callback={handlerResetForm}
      >
        {getValues().email}
      </EmailSent>
      <Card className={"max-w-[378px] mx-auto p-6 flex flex-col"}>
        <Typography className={"text-center"} variant={TypographyVariant.h1}>
          Sign Up
        </Typography>
        <div className={"flex justify-center gap-x-[60px] mb-6 mt-3"}>
          <AuthByGoogle />
          <AuthByGithub />
        </div>

        <form onSubmit={onSubmit}>
          {/* USER NAME*/}
          <div className={"mb-6"}>
            <FormInput
              name={"userName"}
              label={"Username"}
              control={control}
              placeholder={"Epam11"}
            />
          </div>

          {/* USER EMAIL*/}
          <div className={"mb-6"}>
            <FormInput
              name={"email"}
              label={"Email"}
              control={control}
              placeholder={"Epam@epam.com"}
            />
          </div>

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

          {/* Условия соглашения */}
          <div className={"flex flex-col space-y-5"}>
            <div className={"flex items-center justify-center text-center"}>
              <ControllerCheckbox name={"agreesToTOS"} control={control} />
              <Typography
                variant={TypographyVariant.small_text}
                className={"text-light-100"}
              >
                I agree to the{" "}
                <Link
                  href={ROUTES_AUTH.TERMS_OF_SERVICE}
                  className={"text-accent-500 underline inline-block"}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={ROUTES_AUTH.PRIVACY_POLICY}
                  className={"text-accent-500 underline inline-block"}
                >
                  Privacy Policy
                </Link>
              </Typography>
            </div>
            {errors.agreesToTOS?.message && (
              <Typography
                variant={TypographyVariant.small_text}
                className={"text-red-500"}
              >
                {errors.agreesToTOS.message}
              </Typography>
            )}
            <Button disabled={isLoading}>Sign Up</Button>
          </div>
        </form>

        {/*  Вход в аккаунт */}
        <div className={"flex flex-col items-center gap-y-3 mt-[18px] "}>
          <Typography
            variant={TypographyVariant.regular_text_16}
            className={"text-light-100"}
          >
            Do you have an account?
          </Typography>
          <Link href={ROUTES_AUTH.LOGIN} className={"text-accent-500"}>
            Sign In
          </Link>
        </div>
      </Card>
    </Page>
  );
};
