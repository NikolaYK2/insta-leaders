import React, { useEffect } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import { useRegistrationGoogleQuery } from '@/features/auth/api/authService'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import { LocalStorageUtils } from '@/utils/LocalStorageUtil'

export const SignInGoogle: NextPageWithLayout = () => {
  const router = useRouter()
  const { code, state } = router.query
  // Преобразуем значения, если они массивы
  const codeStr = Array.isArray(code) ? code[0] : code
  const stateStr = Array.isArray(state) ? state[0] : state

  const { data } = useRegistrationGoogleQuery({ code: codeStr ?? '' }, { skip: !codeStr })
  console.log(data)

  useEffect(() => {
    if (!codeStr || !stateStr) return

    if (stateStr !== LocalStorageUtils.getValue('latestCSRFToken')) {
      alert('Invalid state parameter. Possible CSRF attack.')
      return
    }
    if (data) {
      router.push(ROUTES_APP.HOME)
    }
  }, [data, stateStr])

  return <div>Processing...</div>
}
