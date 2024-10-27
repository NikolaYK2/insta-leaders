import { NextPage } from 'next'
import React, { PropsWithChildren, useState } from 'react'
import { cn } from '@/common/utils/cn'
import {
  DynamicIcon,
  Header,
  SelectItem,
  Selector,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import { Alert } from '@/common/components/Alert'

const selectLanguage = [
  { icon: 'FlagRussia', title: 'Russian' },
  { icon: 'FlagUnitedKingdom', title: 'English' },
] as const
export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(selectLanguage[1].title)

  return (
    <div className="flex min-h-screen flex-col pt-[60px] px-[min(3.2673%,64px)]">
      <Alert />

      <Header className={'bg-dark-700 w-full z-50'}>
        <div className={'flex justify-between max-w-screen-desktop w-full m-auto'}>
          <div className={'flex'}>
            <Typography variant={TypographyVariant.large}>S</Typography>
            <Typography
              className={'transform translate-y-[6px] translate-x-[-6.4px] text-accent-500'}
              variant={TypographyVariant.large}
            >
              P
            </Typography>
          </div>
          {/*<div>*/}
          {/*  <Link href={ROUTES_APP.HOME}>Main</Link>*/}
          {/*  <Link href={ROUTES_AUTH.REGISTRATION}>Sign Up</Link>*/}
          {/*  <Link href={ROUTES_AUTH.LOGIN}>Sign In</Link>*/}
          {/*  <Link href={ROUTES_AUTH.FORGOT_PASSWORD}>Forgot Password</Link>*/}
          {/*  <Link href={ROUTES_AUTH.RECOVERY_PASSWORD}>Password recovery</Link>*/}
          {/*  <Link href={ROUTES_AUTH.CREATE_NEW_PASSWORD}>Create New Password</Link>*/}
          {/*</div>*/}
          <Selector
            className={'max-w-[163px] w-full'}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            {selectLanguage.map(language => (
              <SelectItem className={'w-[161px]'} key={language.icon} value={language.title}>
                <div className={'flex'}>
                  <DynamicIcon className={'mr-3'} iconId={language.icon} width={20} />
                  <Typography variant={TypographyVariant.regular_text_16}>
                    {language.title}
                  </Typography>
                </div>
              </SelectItem>
            ))}
          </Selector>
        </div>
      </Header>
      <div className="flex flex-1 max-w-screen-desktop w-full m-auto">
        <main className={cn('flex-1 mx-auto w-full')}>{children}</main>
      </div>
    </div>
  )
}
