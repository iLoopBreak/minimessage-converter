/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly API_URL: string;
    
    readonly URL_MINI_TO_HTML: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }