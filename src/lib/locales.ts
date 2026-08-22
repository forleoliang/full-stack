/**
 * 语言常量（纯数据，不依赖 react-intl-universal / 语言包 JSON）
 *
 * middleware 运行在 Edge Runtime，禁止动态求值（eval / new Function），
 * 而 react-intl-universal 内部会用到，所以 middleware 只能从这里取常量，
 * 不能直接 import "@/lib/i18n"，否则构建报 Dynamic Code Evaluation not allowed。
 */

// 支持的语言列表
export const SUPPORTED_LOCALES = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  hi: "हिंदी",
  "zh-TW": "繁體中文",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
} as const;

export type Locale = keyof typeof SUPPORTED_LOCALES;

// 统一 locale 列表，供 middleware、sitemap、各页面使用
export const LOCALE_CODES: readonly Locale[] = [
  "zh",
  "en",
  "ja",
  "ko",
  "hi",
  "zh-TW",
  "es",
  "pt",
  "ru",
  "fr",
  "de",
  "it",
] as const;
