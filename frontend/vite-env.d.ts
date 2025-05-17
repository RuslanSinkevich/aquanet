/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE__API_ENV: string;
    readonly VITE__API_HOST: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }