namespace NodeJS {
  interface ProcessEnv {
    BACKEND_API_KEY: string;
    BACKEND_HOST: string;
    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    RECIPIENT_EMAIL: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_FROM_EMAIL: string;
  }
}
