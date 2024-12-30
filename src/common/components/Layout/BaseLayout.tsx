import { NextPage } from "next";
import React, { PropsWithChildren, useState } from "react";
import { cn } from "@/common/utils/cn";
import {
  Button,
  DynamicIcon,
  Header,
  SelectItem,
  Selector,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { Alert } from "@/common/components/Alert";
import { Logo } from "@/common/components/Logo/Logo";
import Link from "next/link";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";
import { usePathname } from "next/navigation";

type BtnAuth = {
  name: string;
  variant: "primary" | "text";
  link: string;
  className?: string;
};
const BTN_AUTH: BtnAuth[] = [
  {
    name: "Log in",
    variant: "text",
    link: ROUTES_AUTH.LOGIN,
    className: "mr-6 ml-9",
  },
  { name: "Sign up", variant: "primary", link: ROUTES_AUTH.REGISTRATION },
];
const LANGUAGES = [
  { icon: "FlagRussia", title: "Russian" },
  { icon: "FlagUnitedKingdom", title: "English" },
] as const;

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    LANGUAGES[1].title,
  );
  const path = usePathname();

  return (
    <div className="flex min-h-screen w-full mx-auto flex-col">
      {/*<div className="flex min-h-screen w-full mx-auto flex-col pt-[60px]">*/}
      <Alert />

      <Header className={"sticky top-0 bg-dark-700 w-full z-10 p-0"}>
        {/*<Header className={'fixed bg-dark-700 w-full z-10 p-0'}>*/}
        <div
          className={
            "flex justify-between max-w-screen-desktop w-full m-auto px-[min(3.2673%,64px)]"
          }
        >
          <Logo />

          <div className={"flex"}>
            <Selector
              className={"relative max-w-[163px] w-full"}
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              {LANGUAGES.map((language) => (
                <SelectItem
                  className={"relative w-[161px]"}
                  key={language.icon}
                  value={language.title}
                >
                  <div className={"flex"}>
                    <DynamicIcon
                      className={"mr-3"}
                      iconId={language.icon}
                      width={20}
                    />
                    <Typography variant={TypographyVariant.regular_text_16}>
                      {language.title}
                    </Typography>
                  </div>
                </SelectItem>
              ))}
            </Selector>

            {path === "/" &&
              BTN_AUTH.map((btn) => (
                <Button
                  className={cn(btn.className)}
                  key={btn.name}
                  variant={btn.variant}
                >
                  <Link href={btn.link}>{btn.name}</Link>
                </Button>
              ))}
          </div>
        </div>
      </Header>
      <div className="flex flex-1 max-w-screen-desktop w-full m-auto px-[min(3.2673%,64px)]">
        <main className={cn("flex-1 mx-auto w-full")}>{children}</main>
      </div>
    </div>
  );
};
