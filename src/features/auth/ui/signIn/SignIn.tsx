import { AuthByGoogle } from "@/common/components";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Button,
  Card,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import Link from "next/link";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";
import { SignInForm } from "./signInForm/SignInForm";
import { AuthByGithub } from "./authByGithub/AuthByGithub";
import { Page } from "@/common/components/page";

export const SignIn: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={"Sign In"}
      descriptionMeta={"Access your account by signing in"}
    >
      <div className={"max-w-[378px] w-full mx-auto"}>
        <Card className={"text-center p-6"}>
          <Typography variant={TypographyVariant.h1} asChild>
            <h1>Sign In</h1>
          </Typography>
          <div className={"w-[132px] m-auto mb-6 mt-3 flex justify-between"}>
            <AuthByGoogle />
            <AuthByGithub />
          </div>
          <SignInForm />
          <Typography
            variant={TypographyVariant.regular_text_16}
            className={"mt-[18px] mb-1.5"}
          >
            Don’t have an account?
          </Typography>
          <Button variant={"text"} asChild>
            <Link href={ROUTES_AUTH.REGISTRATION}>
              <Typography variant={TypographyVariant.h3}>Sign Up</Typography>
            </Link>
          </Button>
        </Card>
      </div>
    </Page>
  );
};
