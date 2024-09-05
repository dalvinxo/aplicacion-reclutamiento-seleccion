import type { BaseQueryFn } from '@reduxjs/toolkit/query';

declare global {
  type TypeBaseQuery = BaseQueryFn<
    string | { url: string; method: string; body?: any },
    unknown,
    unknown
  >;

  interface IException extends Error {
    data: {
      message: string;
    };
    status: number;
  }

  interface SomeGlobalInterface {
    // Define global interface members here
  }

  interface IUseAlert {
    styles?: React.CSSProperties;
    defaultVariant?: 'filled' | 'outlined' | 'standard';
    defaultSeverity?: 'error' | 'warning' | 'info' | 'success';
  }

  export interface IPagination {
    limit: number;
    page: number;
    totalPages: number;
    total: number;
  }

  export interface IColumnBasic<T> {
    id: T | 'action';
    headerName: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
    formatBool?: (value: boolean) => string;
  }
}
