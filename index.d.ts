/**
 * Author: Omindu Dissanayaka
 * Software Engineering Undergraduate
 * Website: https://www.omindu.dev
 * Email: hellow@omindu.dev
 *
 *  _     _                                                                                   
 * | |__ (_)_ __ _   _ _ __  _   _  _____      _____       ___  ___ _ __ __ _ _ __   ___ _ __ 
 * | '_ \| | '__| | | | '_ \| | | |/ _ \ \ /\ / / __|_____/ __|/ __| '__/ _` | '_ \ / _ \ '__|
 * | | | | | |  | |_| | | | | |_| |  __/\ V  V /\__ \_____\__ \ (__| | | (_| | |_) |  __/ |   
 * |_| |_|_|_|   \__,_|_| |_|\__,_|\___| \_/\_/ |___/     |___/\___|_|  \__,_| .__/ \___|_|   
 *                                                                           |_|              
 */

/** Type definitions for `hirunews-scrap` */
export as namespace HiruScrap;

/** Configuration/options accepted by `new Hiru(options)` */
export interface Options {
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  followRedirects?: boolean;
  validateStatus?: (status: number) => boolean;
  rateLimit?: number;
  /**
   * axios-style proxy config or a URL string (will be parsed by the library)
   */
  proxy?:
    | string
    | {
        protocol?: string;
        host: string;
        port?: number;
        auth?: { username?: string; password?: string };
      }
    | null;
  rotateUserAgent?: boolean;
  cache?: boolean | { ttl?: number; maxSize?: number };
  /** shorthand aliases */
  userAgent?: string;
  ua?: string;
}

/** Single article data extracted from an article page */
export interface Article {
  title: string;
  news: string | null;
  thumb?: string;
  date?: string;
  newsURL: string;
}

export interface CodeCreator {
  name: string;
  github?: string;
  website?: string;
}

export interface ApiResponse<T = any> {
  code: number;
  code_creator: CodeCreator;
  results: T;
}

/**
 * Top-level exported class. This is the value returned by `require('hirunews-scrap')`.
 */
declare class Hiru {
  constructor(options?: Options);

  BreakingNews(): Promise<ApiResponse<Article>>;
  MainNews(): Promise<ApiResponse<Article>>;
  TrendingNews(): Promise<ApiResponse<Article>>;
  InternationalNews(): Promise<ApiResponse<Article>>;
  SportNews(): Promise<ApiResponse<Article>>;
  EntertainmentNews(): Promise<ApiResponse<Article>>;
  BusinessNews(): Promise<ApiResponse<Article>>;

  /** Extract article data for a specific article URL */
  getNews(newsUrl: string): Promise<ApiResponse<Article>>;
}

declare namespace Hiru {
  export type Options = import('./index.d.ts').Options;
  export type Article = import('./index.d.ts').Article;
  export type ApiResponse<T = any> = import('./index.d.ts').ApiResponse<T>;
}

export = Hiru;
