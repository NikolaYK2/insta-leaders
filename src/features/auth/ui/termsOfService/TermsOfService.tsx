import React from 'react'
import { GoBack } from '@/common/components/GoBack/GoBack'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'

export const TermsOfService = () => {
  return (
    <section>
      <GoBack backToTitle={'sign up'} backToRedirect={ROUTES_AUTH.REGISTRATION} />
    </section>
  )
}
