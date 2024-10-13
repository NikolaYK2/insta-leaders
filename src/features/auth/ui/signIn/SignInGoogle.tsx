import React, { useEffect } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import { LocalStorageUtils } from '@/utils/LocalStorageUtil'
import { useAuthByGoogleQuery } from '@/features/auth/api/authService'

export const SignInGoogle: NextPageWithLayout = () => {
  const router = useRouter()

  const { code, state } = router.query
  // Преобразуем значения параметров, если они массивы, берем первый элемент
  // Это важно, так как useRouter.query может возвращать массив строк или строку
  const codeStr = Array.isArray(code) ? code[0] : code
  const stateStr = Array.isArray(state) ? state[0] : state

  // Выполняем запрос для аутентификации пользователя через Google
  // `skip` определяет, выполнять ли запрос - пропускаем, если нет `codeStr`
  const { data, error, isError } = useAuthByGoogleQuery(
    { provider: 'google', code: codeStr ?? '' },
    { skip: !codeStr }
  )

  useEffect(() => {
    // Проверка, что параметры code и state присутствуют
    if (!codeStr || !stateStr) return

    // Проверка, совпадает ли state с сохраненным значением
    // Это важно для защиты от CSRF-атак
    if (stateStr !== LocalStorageUtils.getValue('latestCSRFToken')) {
      alert('Invalid state parameter. Possible CSRF attack.')
      return // Останавливаем выполнение, если проверка не прошла
    }

    if (data) {
      router
        .push(`${ROUTES_APP.PROFILE}/${data.data.user.id}`) // Переход на страницу профиля пользователя
        .then(() => {
          console.log('Redirected to profile') // Лог успешного перенаправления
        })
        .catch(error => {
          console.error('Navigation failed:', error) // Лог ошибки, если перенаправление не удалось
        })
    }
  }, [data, stateStr, codeStr])

  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return <div>Processing...</div>
}
