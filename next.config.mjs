/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/v1/auth/email-confirmation', // длинный путь, который ты хочешь перенаправить
        destination: '/emailConfirmation', // короткий путь
        permanent: false, // false означает временный редирект
      },
    ];
  },
};

export default nextConfig;
