import { NextPage } from 'next'
import React, { PropsWithChildren, useEffect, useState } from 'react'
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
import { useRouter } from 'next/router'
import { useMeQuery } from '@/features/auth/api/authService'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import { Logo } from '@/common/components/Logo/Logo'

const LANGUAGES = [
  { icon: 'FlagRussia', title: 'Russian' },
  { icon: 'FlagUnitedKingdom', title: 'English' },
] as const
export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGES[1].title)
  const router = useRouter()
  const { data: me, isLoading: isLoadMe } = useMeQuery()

  useEffect(() => {
    if (!isLoadMe) {
      if (me) {
        router.push(`${ROUTES_APP.PROFILE}/${me.userId}`).catch(console.error)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full mx-auto flex-col pt-[60px]">
      <Alert />

      <Header className={'fixed bg-dark-700 w-full z-10 p-0'}>
        <div
          className={
            'flex justify-between max-w-screen-desktop w-full m-auto px-[min(3.2673%,64px)]'
          }
        >
          <Logo />

          <Selector
            className={'!relative max-w-[163px] w-full'}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            {LANGUAGES.map(language => (
              <SelectItem
                className={'!relative w-[161px]'}
                key={language.icon}
                value={language.title}
              >
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
      <div className="flex flex-1 max-w-screen-desktop w-full m-auto px-[min(3.2673%,64px)]">
        <main className={cn('flex-1 mx-auto w-full')}>{children}</main>
      </div>
    </div>
  )
}
