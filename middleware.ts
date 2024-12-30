// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'
// import { ROUTES_AUTH } from '@/appRoot/routes/routes'
//
// export function middleware(request: NextRequest) {
//   // Получаем токен из cookies
//   const token = request.cookies.get('accessToken')?.value
//   // Если токена нет и запрос идет на маршрут из ROUTES_AUTH
//   if (!token && request.nextUrl.pathname.startsWith('/')) {
//     // Перенаправляем на страницу логина
//     return NextResponse.redirect(new URL(ROUTES_AUTH.LOGIN, request.url))
//   }
//
//   // Если авторизован или находится на публичной странице, продолжаем выполнение запроса
//   return NextResponse.next()
// }
