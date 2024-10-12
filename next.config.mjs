/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

    ];
  },
};

export default nextConfig;
