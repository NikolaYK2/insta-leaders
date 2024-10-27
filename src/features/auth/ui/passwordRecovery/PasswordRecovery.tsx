import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'

export const PasswordRecovery: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'Password Recovery'}
      descriptionMeta={'Recover your account by resetting your password'}
    >
      <h2>Password recovery</h2>
    </Page>
  )
}
