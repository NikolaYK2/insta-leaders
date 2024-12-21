declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_STATE: string;
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
    NEXT_PUBLIC_BASE_URL: string; // Другие переменные окружения, которые вам нужны
    NEXT_PUBLIC_API_URL: string; // Другие переменные окружения, которые вам нужны
  }
}
