import React, { ReactNode } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { TabContent, Tabs, TabType } from '@nikolajk2/lib-insta-leaders'
import { Page } from '@/common/components/page'
import { GeneralInformation } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/GeneralInformation'

type TabsTrigger = TabType & {
  component: ReactNode
}
const tabsTrigger: TabsTrigger[] = [
  { value: 'General information', title: 'General information', component: <GeneralInformation /> },
  { value: 'Devices', title: 'Devices', component: 'Devices' },
  { value: 'Account Management', title: 'Account Management', component: 'Account Management' },
  { value: 'My payments', title: 'My payments', component: 'My payments' },
]
export const settingProfile: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'Setting profile'}
      descriptionMeta={'Customise your profile: update your personal data '}
    >
      <Tabs fullWidth tabs={tabsTrigger} defaultValue={tabsTrigger[0].value}>
        {tabsTrigger.map(tab => (
          <TabContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabContent>
        ))}
      </Tabs>
    </Page>
  )
}
