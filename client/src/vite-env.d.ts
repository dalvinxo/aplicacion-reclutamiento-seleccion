/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_OTHER_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  type TypeBaseQuery = BaseQueryFn<
    string | { url: string; method: string; body?: any },
    unknown,
    unknown
  >;
}
