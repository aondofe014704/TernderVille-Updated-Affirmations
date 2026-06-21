declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    NEXT_PUBLIC_SITE_URL: string;
  }
}

export {};
