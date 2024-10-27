/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sociable-people.storage.yandexcloud.net',
        pathname: '/**'//** - означает что будет какая угодна картинка
      },
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/**'//** - означает что будет какая угодна картинка
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/api/v1/auth/email-confirmation', // длинный путь, который ты хочешь перенаправить
        destination: '/emailConfirmation', // короткий путь
        permanent: true, // false означает временный редирект
      },
      {
        source: '/api/v1/auth/password-recovery', // длинный путь, который ты хочешь перенаправить
        destination: '/createNewPassword', // короткий путь
        permanent: true, // false означает временный редирект
      },
      {
        source: '/',
        destination: '/signIn',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
