import React from 'react'
import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

export const AuthByGoogle = () => {
  // Идентификатор клиента, выданный Google, который используется для OAuth аутентификации
  // создаем у себя в корне проекта файл .env NEXT_PUBLIC_GOOGLE_CLIENT_ID=клиентский id
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  // URL, куда пользователь будет перенаправлен после успешной аутентификации
  const redirect_uri = 'http://localhost:3000/google' // Локальный URI, используемый для разработки, его нужно заменить на production URI при развертывании

  // Генерируем уникальное значение для защиты от CSRF-атак
  const state = process.env.NEXT_PUBLIC_GOOGLE_STATE // Используем встроенный метод crypto.randomUUID(), чтобы создать уникальный токен

  // Сохраняем сгенерированный токен в локальное хранилище, чтобы использовать его позже для проверки на сервере
  LocalStorageUtil.setValue('latestCSRFToken', state) // Используем утилиту для записи токена в LocalStorage

  // Формируем ссылку для аутентификации через Google
  // Содержит все необходимые параметры для OAuth 2.0: client_id, response_type, scope, redirect_uri и state
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=code&scope=email profile&redirect_uri=${redirect_uri}&state=${state}`

  return (
    // Компонент Link из Next.js используется для навигации на внешнюю ссылку аутентификации Google
    <Link
      className={
        'p-1 inline-flex border-2 border-transparent focus:border-2 focus:border-accent-100'
      }
      href={link}
    >
      <DynamicIcon iconId={'GoogleSvgrepoCom1'} width={36} height={36} />
    </Link>
  )
}
