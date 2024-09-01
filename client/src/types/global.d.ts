import type { BaseQueryFn } from '@reduxjs/toolkit/query';

declare global {
  type TypeBaseQuery = BaseQueryFn<
    string | { url: string; method: string; body?: any },
    unknown,
    unknown
  >;

  interface SomeGlobalInterface {
    // Define global interface members here
  }

  // Añade más tipos globales aquí
}
