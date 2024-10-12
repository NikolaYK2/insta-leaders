import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Tabs, TabType, TabContent } from '@nikolajk2/lib-insta-leaders'
import { Page } from '@/common/components/page'

const tabsTrigger: TabType[] = [
  { value: 'General information', title: 'General information' },
  { value: 'Devices', title: 'Devices' },
  { value: 'Account Management', title: 'Account Management' },
  { value: 'My payments', title: 'My payments' },
]
export const settingProfile: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'Setting profile'}
      descriptionMeta={'Customise your profile: update your personal data '}
    >
      <Tabs fullWidth tabs={tabsTrigger}>
        {tabsTrigger.map((tab: TabType) => (
          <TabContent key={tab.value} value={tab.value}>
            {tab.title}
          </TabContent>
        ))}
      </Tabs>
    </Page>
  )
}
