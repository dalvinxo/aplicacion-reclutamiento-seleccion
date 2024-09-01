import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';

declare global {
  type TypeBaseQuery = BaseQueryFn<
    string | { url: string; method: string; body?: any },
    unknown,
    unknown
  >;

  type RootStateGlobal = RootState;

  interface SomeGlobalInterface {
    // Define global interface members here
  }

  // Añade más tipos globales aquí
}
