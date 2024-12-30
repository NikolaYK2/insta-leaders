import React, { useEffect } from "react";
import {
  Button,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import img from "../../../../assets/images/signUp/bro.png";
import Image from "next/image";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";
import { useRouter } from "next/router";
import { useConfirmEmailMutation } from "@/features/auth/api/authService";
import { Page } from "@/common/components/page";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";
import { showAlert } from "@/appRoot/app.slice";

export const EmailConfirmation: NextPageWithLayout = () => {
  const router = useRouter();
  const { code } = router.query;
  const dispatch = useAppDispatch();

  const [confirmEmail, { isError, isLoading, isSuccess }] =
    useConfirmEmailMutation();

  const verifyEmail = async () => {
    try {
      if (code) {
        await confirmEmail({ confirmationCode: code as string });
      }
    } catch (e: any) {
      dispatch(
        showAlert({
          variant: "alertError",
          message: e.data.messages[0].message || "verification failed!",
        }),
      );
      await router.push(ROUTES_AUTH.EMAIL_VERIFICATION);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <Page
        titleMeta={"Email confirmation"}
        descriptionMeta={"Email confirmation"}
        className={"flex flex-col items-center justify-center text-center"}
      >
        <Typography variant={TypographyVariant.h1} className={"mb-5"}>
          Congratulations!
        </Typography>
        <Typography
          variant={TypographyVariant.regular_text_16}
          className={"mb-[54px]"}
        >
          Your email has been confirmed
        </Typography>
        <Button asChild className={"w-[182px] mb-[72px] hover:text-light-100"}>
          <Link href={ROUTES_AUTH.LOGIN}>Sign In</Link>
        </Button>
        <Image src={img} alt={"Email confirmed"} width={432} height={300} />
      </Page>
    );
  }
};
