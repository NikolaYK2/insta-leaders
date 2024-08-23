/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Перенаправление маршрутов: позволяет исключить из URL отображение папки "auth"
  async rewrites() {
    return [
      {source: '/signIn', destination: '/auth/ui/signIn',},
      {source: '/signUp', destination: '/auth/ui/signUp',},
      {source: '/passwordRecovery', destination: '/auth/ui/passwordRecovery',},
      {source: '/forgotPassword', destination: '/auth/ui/forgotPassword',},
      {source: '/createNewPassword', destination: '/auth/ui/createNewPassword',},
      {source: '/createNewPassword', destination: '/auth/ui/createNewPassword',},
      {source: '/', destination: '/userHub/ui/',},
      {source: '/create', destination: '/userHub/ui/create',},
      {source: '/myProfile', destination: '/userHub/ui/myProfile',},
      {source: '/messenger', destination: '/userHub/ui/messenger',},
      {source: '/search', destination: '/userHub/ui/search',},
      {source: '/statistics', destination: '/userHub/ui/statistics',},
      {source: '/favorites', destination: '/userHub/ui/favorites',},
    ]
  }
};

export default nextConfig;
