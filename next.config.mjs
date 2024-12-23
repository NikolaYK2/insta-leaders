/** @type {import('next').NextConfig} */

/*
Компонент next/image включает встроенный оптимизатор изображений и по умолчанию требует
явного указания доверенных доменов для внешних URL, чтобы избежать проблем с безопасностью.

У меня была ошибка связана с использованием компонента next/image и настройкой домена
для загрузки изображений. URL-адрес: https://staging-it-incubator.s3.eu-central-1.amazonaws.com не был включен
в список разрешённых доменов в этом файле и я его добавил. Строка 11 с комментарием 11.
*/
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'], // 11
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'sociable-people.storage.yandexcloud.net',
    //             pathname: '/**'//** - означает что будет какая угодна картинка
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'storage.yandexcloud.net',
    //             pathname: '/**'//** - означает что будет какая угодна картинка
    //         }
    //     ]
    },
    async redirects() {
        return [
            {
                source: '/auth/registration-confirmation', // длинный путь, который ты хочешь перенаправить
                destination: '/emailConfirmation', // короткий путь
                permanent: true, // false означает временный редирект
            },
            {
                source: '/auth/recovery', // длинный путь, который ты хочешь перенаправить
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
