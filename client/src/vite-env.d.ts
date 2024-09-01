/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_DOMAIN_API: string;
  VITE_VERSION_API: string;
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
